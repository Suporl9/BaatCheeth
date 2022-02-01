import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB39-_5Sb4ym26-1zStrOeC4kkdTfIUts0",
  authDomain: "baatcheeth-183ad.firebaseapp.com",
  projectId: "baatcheeth-183ad",
  storageBucket: "baatcheeth-183ad.appspot.com",
  messagingSenderId: "711551029487",
  appId: "1:711551029487:web:3cb62befda9242c93a0b1a",
  measurementId: "G-CRT0X1T9WE",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export { auth, db, provider };

export default app;
