import { createContext, useContext, useEffect, useState } from "react";
import app, { fireStoreDB, firebaseStorage } from '../services/Firebase'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, updateProfile, signOut, sendEmailVerification, sendPasswordResetEmail} from 'firebase/auth'
import bcrypt from "bcryptjs";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const auth=getAuth(app)
const googleAuth=new GoogleAuthProvider()

export const AuthContext=createContext(null)

export const useAppContext=()=>useContext(AuthContext)

const ContextProvider=({children})=>{
  const [user, setUser]=useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [journalLoading, setJournalLoading] = useState(false)   
  const [isJournalUnlocked, setIsJournalUnlocked] = useState(false);

  useEffect(()=>{
    const res=onAuthStateChanged(auth, async(currUsr)=>{
      if (currUsr) {
        const ref = doc(fireStoreDB, "users", currUsr.uid)
        const snap = await getDoc(ref)

        if (snap.exists()) {
          setUser({ ...currUsr, appData: snap.data() })
        } else {
          setUser(currUsr)
        }
      } else {
        setUser(null)
      }

      setAuthLoading(false)
    })
    return ()=>res()
  },[])

  const createNewUserFromEmailAndPassword = async (email, password, name) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(res.user, { displayName: name })
    await sendEmailVerification(res.user)

    const ref = doc(fireStoreDB, "users", res.user.uid)

    await setDoc(ref, {
      uid: res.user.uid,
      name,
      email,
      createdAt: serverTimestamp(),
      journalPinSet: false,
    })

    const snap = await getDoc(ref)
    setUser({ ...res.user, appData: snap.data() })
  }


  const loginUserFromEmailAndPassword = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password)

    const ref = doc(fireStoreDB, "users", res.user.uid)

    await setDoc(ref, { lastLoginAt: serverTimestamp() }, { merge: true })

    const snap = await getDoc(ref)
    setUser({ ...res.user, appData: snap.data() })
  }

  const logOutUser=async()=>{
    await signOut(auth)
    setIsJournalUnlocked(false)
    setUser(null)
  }

  const googleUser = async () => {
    const res = await signInWithPopup(auth, googleAuth)

    const ref = doc(fireStoreDB, "users", res.user.uid)
    const snap = await getDoc(ref)

    if (!snap.exists()) {
      await setDoc(ref, {
        uid: res.user.uid,
        name: res.user.displayName || "",
        email: res.user.email,
        createdAt: serverTimestamp(),
        journalPinSet: false,
      })
    }

    const finalSnap = await getDoc(ref)
    setUser({ ...res.user, appData: finalSnap.data() })
  }


  const resetPassword=async(email)=>{
    await sendPasswordResetEmail(auth, email)
  }

  const authErrorMessage=(code)=>{
    switch (code){
      case "auth/user-not-found":
        return "No account found with this email";
      case "auth/wrong-password":
        return "Incorrect password";
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/user-disabled":
        return "This account has been disabled";
      default:
        return "Something went wrong. Try again.";
    }
  }


  const setJournalPassword=async(pwd)=>{
    try{
      const hash= await bcrypt.hash(pwd, 10)

      const ref=doc(fireStoreDB, 'users', user.uid, 'security', 'journal')

      await setDoc(ref, {
        journalPassword:hash,
        createdAt:serverTimestamp()
      })

      await setDoc(
        doc(fireStoreDB, "users", user.uid),
        { journalPinSet: true },
        { merge: true }
      )

      return true
    }catch(err){
      console.error("Error setting password", err);
      return false;
    }
  }

  const verifyJournalPassword=async(pwd)=>{
    try{
      const ref= doc(fireStoreDB, 'users', user.uid, 'security', 'journal')
      const snap=await getDoc(ref)

      if(!snap.exists())return 'NO_PASSWORD'

      const data= snap.data()

      const isMatch=bcrypt.compareSync(pwd, data.journalPassword)

      if(isMatch){
        setIsJournalUnlocked(true)
        return'OK'
      } 

      return "INVALID";

    }catch(err){
      console.error(err);
      return "ERROR";
    }
  }

  const changeJournalPassword=async(oldPwd, newPwd)=>{
    try{
      let ref=await verifyJournalPassword(oldPwd)

      if(ref !=='OK')return { ok: false, reason: ref };

      const success=await setJournalPassword(newPwd)
      return { ok: !!success };
    }catch(err){
      console.error("changeJournalPassword error", err);
      return { ok: false, reason: "ERROR" };
    }
  }

  const [entries, setEntries]=useState([])

  const setJournalEntry=async(entry)=>{
    if(!user) return

    try{
      const JournalId=entry.id|| new Date().toISOString();
      const ref=doc(fireStoreDB, 'users', user.uid, 'journals', JournalId)
      await setDoc(ref, {
        date:entry.date || new Date().toISOString(),
        subject:entry.subject || "",
        content:entry.content ||"",
        dayRating:entry.dayRating || null,
        mood:entry.mood || null,
        proudOf:entry.proudOf ||null,
        regret:entry.regret ||null,
        couldDoBetter:entry.couldDoBetter ||null,
        productivity:entry.productivity ||null,
        happy:entry.happy ||null,
        futureSelf:entry.futureSelf ||null,
        visibility:entry.visibility || "private",
        createdAt:serverTimestamp(),
        lastEdited:serverTimestamp(),
        authorName:user.displayName,
        authorId:user.uid,
        createdAtClient: new Date().toISOString(),
      })

      return true
    }catch(err){
      console.log(err)
      return false
    }
  }

  const fetchJournalEntry=async()=>{
    if(!user) return

    setJournalLoading(true)
    const colRef=collection(fireStoreDB, 'users', user.uid, 'journals')
    const q=query(colRef, orderBy('createdAtClient', 'desc'))
    const snap=await getDocs(q)
    const data=snap.docs.map(doc=>({id:doc.id, ...doc.data()}))

    setEntries(data)
    setJournalLoading(false)
  }

  const updateJournalEntry=async(JournalId, updatedFields)=>{
    if(!user) return

    try{
      const ref=doc(fireStoreDB, "users", user.uid, "journals", JournalId)
      await updateDoc(ref,{
        ...updatedFields,
        lastEdited:serverTimestamp()
      })
      return true
    }catch(err){
      console.log(err)
      return false
    }
  }

  const deleteJournalEntry=async(journalId)=>{
    if(!user) return
    try{
      const ref=doc(fireStoreDB, "users", user.uid, "journals", journalId);
      await deleteDoc(ref)

      return true
    }catch(err){
      console.error(err)
      return false
    }
  }

  const [visionsList, setVisionsList]=useState([])
  const createVisionBoard = async (visionData) => {
    if (!user) return false

    try {
      const visionID = visionData.id || new Date().toISOString()

      const ref = doc(
        fireStoreDB,
        "users",
        user.uid,
        "visionboards",
        visionID
      )

      await setDoc(ref, {
        period: visionData.period,
        title: visionData.title,
        intention: visionData.intention,
        targetDate: visionData.targetDate,
        categories: visionData.categories || [],
        authorId: user.uid,
        createdAt: serverTimestamp(),
        createdAtClient: new Date().toISOString(),
      })

      return true
    } catch (err) {
      console.error("createVisionBoard error", err)
      return false
    }
  }


  const fetchVisionBoards=async()=>{
    if(!user) return
    const colRef=collection(fireStoreDB, 'users', user.uid, 'visionboards')
    const q=query(colRef, orderBy('createdAt', 'desc'))
    const snap=await getDocs(q)
    const data=snap.docs.map(doc=>({id:doc.id, ...doc.data()}))
    setVisionsList(data)
    return data
  }

  const deleteVisionBoard=async(id)=>{
    try{
      const ref=doc(fireStoreDB, "users", user.uid,"visionboards",id)
      await deleteDoc(ref)
      return true
    }catch(err){
      console.error(err)
      return false
    }
  }

  const updateVisionBoard = async (id, visionData) => {
  if (!user) return false

  try {
    const ref = doc(
      fireStoreDB,
      "users",
      user.uid,
      "visionboards",
      id
    )

    await updateDoc(ref, {
      period: visionData.period,
      title: visionData.title,
      intention: visionData.intention,
      targetDate: visionData.targetDate,
      categories: visionData.categories || [],
      lastEdited: serverTimestamp(),
    })

    return true
  } catch (err) {
    console.error("updateVisionBoard error", err)
    return false
  }
}


  const uploadImage=async  (file, userId)=>{
    if(!file) return ""

    const imageRef=ref(firebaseStorage,
      `visionBoards/${userId}/${Date.now()}-${file.name}`
    )

    await uploadBytes(imageRef, file)
    return await getDownloadURL(imageRef)


  }

  return(
    <AuthContext.Provider value={{user, setUser, createNewUserFromEmailAndPassword, loginUserFromEmailAndPassword, logOutUser, googleUser, authLoading, setAuthLoading,journalLoading,setJournalLoading, resetPassword, authErrorMessage, setJournalPassword, verifyJournalPassword, changeJournalPassword, fetchJournalEntry, entries, isJournalUnlocked, setIsJournalUnlocked, setJournalEntry, updateJournalEntry, deleteJournalEntry, createVisionBoard,fetchVisionBoards, setVisionsList, visionsList, deleteVisionBoard, updateVisionBoard, uploadImage }}>
      {children}
    </AuthContext.Provider>
  )
}

export default ContextProvider
