import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBd4ASj6J-0ZDeZsQXmL7FVySfcHVkrbI",
  authDomain: "summarist-project-853fc.firebaseapp.com",
  projectId: "summarist-project-853fc",
  storageBucket: "summarist-project-853fc.firebasestorage.app",
  messagingSenderId: "1011131143045",
  appId: "1:1011131143045:web:6daf3ff46c4fac1a756aec"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();