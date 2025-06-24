import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0CA-LV4iXqkX2kugoRjgJRoatDE6y88Q",
    authDomain: "getritely-prod.firebaseapp.com",
    projectId: "getritely-prod",
    storageBucket: "getritely-prod.firebasestorage.app",
    messagingSenderId: "633865781679",
    appId: "1:633865781679:web:84b1f262fb287378af6f5a",
    measurementId: "G-LLLZVY97WK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firestore
export const db = getFirestore(app);

// Function to add a user to the waitlist
export const addToWaitlist = async (name: string, email: string) => {
  try {
    const docRef = await addDoc(collection(db, 'Waitlist'), {
      email: email.trim().toLowerCase(),
      name: name.trim(),
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString(),
    });
    
    console.log('Document written with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding document: ', error);
    return { success: false, error: error };
  }
};

export default app; 