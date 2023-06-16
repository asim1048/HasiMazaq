import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5uz0xdimNoKs5efKbKLNvw7BpQdKsTd4",
  authDomain: "baatcheet-web-2165b.firebaseapp.com",
  projectId: "baatcheet-web-2165b",
  storageBucket: "baatcheet-web-2165b.appspot.com",
  messagingSenderId: "384158389437",
  appId: "1:384158389437:web:565c9fd2d9b77ce6b213d4",
  measurementId: "G-VH3J75Q5TJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
