// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkcgLpQqrebE5g5mSjWGeyFIHLT9-A3XQ",
  authDomain: "pantryhadstarter.firebaseapp.com",
  projectId: "pantryhadstarter",
  storageBucket: "pantryhadstarter.appspot.com",
  messagingSenderId: "562795856636",
  appId: "1:562795856636:web:061306d83600368f91cd79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
