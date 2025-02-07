import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCs7WGBld0DyPw_MnI8uvFYsHJr5ziWlgw",
    authDomain: "ecommerce-521ca.firebaseapp.com",
    projectId: "ecommerce-521ca",
    storageBucket: "ecommerce-521ca.firebasestorage.app",
    messagingSenderId: "692616853052",
    appId: "1:692616853052:web:3c682076e907ce383af539"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
