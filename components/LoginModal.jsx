"use client";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/configure";
import styles from "./LoginModal.module.css";
import Image from "next/image";
import google from "../assets/google.png";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useUser } from "../src/app/context/UserContext";

export default function LoginModal({ closeLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState(null);
  const { setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const el = document.createElement("div");
    el.setAttribute("id", "login-portal");
    document.body.appendChild(el);
    setPortalElement(el);

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      if (el) document.body.removeChild(el);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = isSignUp
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      setUser(result.user);
      closeLogin();

      router.push("/explore/for-you");
    } catch (err) {
      alert(err?.message || "Unknown error occurred");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      closeLogin();
      router.push("/explore/for-you");
    } catch (err) {
      alert(err?.message || "Unknown error occurred");
    }
  };

  const handleGuest = () => {
  const guest = { displayName: "Guest" };
  setUser(guest);
  localStorage.setItem("user", JSON.stringify(guest));
  closeLogin();
  router.push("/explore/for-you");
};

  if (!mounted || !portalElement) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.close} onClick={closeLogin}>
          ✕
        </div>

        <h2>{isSignUp ? "Create Account" : "Sign In to Summarist"}</h2>

        <form className={styles.input} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={styles.btn__wrapper}>
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p
          className={styles.toggle}
          onClick={() => setIsSignUp((prev) => !prev)}
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "Need an account? Sign up"}
        </p>

        <hr />

        <button onClick={handleGoogleLogin} className={styles.btn__wrapper}>
          <figure className={styles.google__img}>
            <Image className={styles.size__img} src={google} alt="google" />
          </figure>
          <div>Sign in with Google</div>
        </button>

        <button
          onClick={handleGuest}
          className={`${styles.btn__wrapper} ${styles.width}`}
        >
          <figure className={styles.google__img}>
            <FaUser className={`${styles.size__img} ${styles.color}`} />
          </figure>
          <div>Continue as Guest</div>
        </button>
      </div>
    </div>,
    portalElement
  );
}
