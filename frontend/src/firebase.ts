import { initializeApp } from "firebase/app";
import { FirebaseConfig } from "./types/types";
import { getAuth } from "firebase/auth";


const firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyDeDVIcavTnvu39RQETLcWwvIF-ChOy8yo",
    authDomain: "mern-4678f.firebaseapp.com",
    projectId: "mern-4678f",
    storageBucket:"mern-4678f.appspot.com" ,
    messagingSenderId: "473464465826",
    appId:"1:473464465826:web:977ba4ef1a9d48a5a92afb",
    measurementId: "G-DZ9XB3MCZ0"
};

export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
