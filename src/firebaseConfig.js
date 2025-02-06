import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiaqJGF4tnfmBy4p4dBFZm9edmDq6mJn4",
  authDomain: "ecommerce-4509d.firebaseapp.com",
  projectId: "ecommerce-4509d",
  storageBucket: "ecommerce-4509d.firebasestorage.app",
  messagingSenderId: "716256601487",
  appId: "1:716256601487:web:53f744988cd134383a57fa"
};

  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

