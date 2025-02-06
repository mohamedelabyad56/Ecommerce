import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
 
// Your web app's Firebase configuration
'const firebaseConfig = {
  apiKey: "AIzaSyA3xsiY9os4Hyc3nxSZjd1YUScW3uNqVLM",
  authDomain: "p-ecommerce-3311f.firebaseapp.com",
  projectId: "p-ecommerce-3311f",
  storageBucket: "p-ecommerce-3311f.appspot.com",  // CORREGIDO
  messagingSenderId: "123913151420",
  appId: "1:123913151420:web:0b7d99c3f758b90b1841b9"
};

  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
