import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDr25JVGbi7P4iiT-eOvgDMML-87sqtbdU",
  authDomain: "quietcloud-37173.firebaseapp.com",
  projectId: "quietcloud-37173",
  storageBucket: "quietcloud-37173.firebasestorage.app",
  messagingSenderId: "43252715096",
  appId: "1:43252715096:web:8ddf996abd29080650442d",
  measurementId: "G-GXFDGD5G80"
};

const app = initializeApp(firebaseConfig);
export const firestoreDb=getFirestore(app)
export default app