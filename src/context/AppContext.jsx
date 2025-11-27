import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app, { firestoreDb } from '../service/Firebase'
import { serverTimestamp, setDoc, getDoc, doc, collection, query, orderBy, getDocs, deleteDoc, updateDoc, where } from 'firebase/firestore';
import { collectionGroup } from 'firebase/firestore';
import bcrypt from 'bcryptjs'

const auth= getAuth(app)
const googleProvider=new GoogleAuthProvider()

export const AppContext=createContext({})

export const useAppContext=()=>useContext(AppContext)

const ContextProvider=({children})=>{
  const [user, setUser]=useState(null)
  const [loading, setLoading]=useState(true)

  useEffect(()=>{
    let res=onAuthStateChanged(auth, (currUsr)=>{
      setUser(currUsr??null)
      setLoading(false)
    })
    return ()=>res()
  },[])

  const createNewUser=async(email, password, name)=>{
    let res= await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(res.user,{
      displayName:name
    })
    setUser(res.user)
  }

  const logInUser=async(email, password)=>{
    let res= await signInWithEmailAndPassword(auth, email, password)
    setUser(res.user)
  }

  const googleUser=async()=>{
    let res= await signInWithPopup(auth, googleProvider)
    setUser(res.user)
  }
  const logOut=async()=>{
    await signOut(auth)
    setJournalUnlocked(false)
  }


  const [journalUnlocked, setJournalUnlocked] = useState(false);
  const setJournalPassword=async(pwd)=>{
    try{
      const salt= bcrypt.genSaltSync(10)
      const hash= bcrypt.hashSync(pwd, salt)

      const ref=doc(firestoreDb, 'users', user.uid, 'security', 'journal')

      await setDoc(ref,{
        journalPassword:hash,
        createdAt:serverTimestamp()
      })

      return true;
    }catch(err){
      console.error("Error setting password", err);
      return false;
    }
  }

  const verifyJournalPassword = async (pwd) => {
    try {
      const ref = doc(firestoreDb, 'users', user.uid, 'security', 'journal');
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        console.log("No password found");
        return "NO_PASSWORD";
      }
      const data = snap.data();
      const isMatch = bcrypt.compareSync(pwd, data.journalPassword);

      if (isMatch) {
        setJournalUnlocked(true);
        return "OK";
      }

      console.log("Invalid password");
      return "INVALID";

    } catch (err) {
      console.error("verifyJournalPassword ERROR:", err);
      return false;
    }
  };

  const changeJournalPassword=async(oldPwd, newPwd)=>{
    try{
      let res=await verifyJournalPassword(oldPwd)
      if(res !=='OK') return { ok: false, reason: res };

      const success=await setJournalPassword(newPwd)
      return { ok: !!success };

    }catch(err){
      console.error("changeJournalPassword error", err);
      return { ok: false, reason: "ERROR" };
    }
  }


  const [entries, setEntries] = useState([]);
  const setJournalEntry=async(entry)=>{
    if(!user) return
    try{
      const journalId = entry.id || new Date().toISOString(); 
      const journalRef=doc(firestoreDb,'users',user.uid, 'journals', journalId)
      await setDoc(journalRef, {
        title: entry.title || "",
        mood: entry.mood || null,
        rating: entry.rating || null,
        content: entry.content || "",
        whatILearned: entry.whatILearned || null,
        whatIWantToChange: entry.whatIWantToChange || null,
        whatHurtMe: entry.whatHurtMe || null,
        isPublic: entry.isPublic || false,
        noteForTomorrow: entry.noteForTomorrow || null,
        letterToFutureSelf: entry.letterToFutureSelf || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        authorName: user.displayName || "Anonymous",
        authorId: user.uid,
        message:entry.message || null
      });
      return true;
    }catch(err){
      console.error("Failed to save journal:", err);
      return false;
    }
  }

  const getJournalEntry = async () => {
    if (!user) return []; // prevent undefined journals
    try {
      const journalRef = collection(firestoreDb, "users", user.uid, "journals");
      const q = query(journalRef, orderBy("createdAt", "desc"));
      const snap = await getDocs(q);

      return snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (err) {
      console.error("Failed to get journals", err);
      return [];
    }
  };

  const updateJournalEntry=async(journalId, updatedFields)=>{
    if(!user) return
    try{
      const journalRef = doc(firestoreDb, "users", user.uid, "journals", journalId);
      await updateDoc(journalRef, {
        ...updatedFields,
        updatedAt: serverTimestamp()
      });
      return true;
    }catch(err){
      console.error("Failed to update journal entry", err);
      return false;
    }
  }

  const deleteJournalEntry=async(journalId)=>{
    if(!user) return
    try{
      const journalRef = doc(firestoreDb, "users", user.uid, "journals", journalId);
      await deleteDoc(journalRef);
      return true; 
    }catch(err){
      console.error("Failed to delete journal entry", err);
      return false;
    }
  }
  
  const getAllPublicJournal = async () => {
    try {
      const q = query(collectionGroup(firestoreDb, "journals"), where("isPublic", "==", true), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);

      return snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (err) {
      console.error(err);
      return [];
    }
  };



  const setBlogEntry=async(blog)=>{
    if(!user) return
    try{
      const blogId = blog.id || new Date().toISOString();
      const blogRef = doc(firestoreDb, 'blogs', blogId);
      await setDoc(blogRef, {
        title: blog.title || "",
        content: blog.content || "",
        authorName: user.displayName || "Anonymous",
        authorId: user.uid,
        tags: blog.tags || [],
        isPublic: blog.isPublic || false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return true;
    }catch (err) {
      console.error("Failed to save blog:", err);
      return false;
    }
  }

  const getAllPublicBlogs = async () => {
    try {
      const q = query(collection(firestoreDb, 'blogs'), where("isPublic", "==", true), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const deleteBlogEntry = async (blogId) => {
    try {
      const blogRef = doc(firestoreDb, 'blogs', blogId);
      await deleteDoc(blogRef);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return(
    <AppContext.Provider value={{createNewUser, user, loading, setLoading, logInUser, googleUser, logOut, verifyJournalPassword, setJournalPassword, changeJournalPassword,setBlogEntry,getAllPublicBlogs,  deleteBlogEntry, journalUnlocked,setJournalUnlocked, getAllPublicJournal,setJournalEntry, getJournalEntry, updateJournalEntry, deleteJournalEntry, entries, setEntries}}>
      {children}
    </AppContext.Provider>
  )
}
export default ContextProvider