import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCX89MrYUhTzozHLsNjH-rP3PX0X10EThA",
  authDomain: "flickstream-cb9b5.firebaseapp.com",
  projectId: "flickstream-cb9b5",
  storageBucket: "flickstream-cb9b5.appspot.com",
  messagingSenderId: "871075197317",
  appId: "1:871075197317:web:e1c8045bafdb86b1afd4ec",
  measurementId: "G-TRM7RFN1TF"
};

const app = initializeApp(firebaseConfig);

// ✅ Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Keep user logged in on refresh
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("✅ Firebase Auth now persists across refresh");
  })
  .catch((error) => {
    console.error("❌ Error enabling auth persistence:", error);
  });
