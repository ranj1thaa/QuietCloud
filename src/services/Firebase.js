import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeQEzf6mQ-dRJGZNgwqGnduQ_UqdwJQ0c",
  authDomain: "quietclouds-6e251.firebaseapp.com",
  projectId: "quietclouds-6e251",
  storageBucket: "quietclouds-6e251.appspot.com",
  messagingSenderId: "1041649322382",
  appId: "1:1041649322382:web:17f00993a3aa8b2d5fbcdf"
};

const app = initializeApp(firebaseConfig);

export const fireStoreDB = getFirestore(app);
export const firebaseStorage = getStorage(
  app,
  "gs://quietclouds-6e251.appspot.com" 
);

export default app;
