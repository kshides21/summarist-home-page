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
import Link from "next/link";

export default function LoginModal({ closeLogin, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
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
    } catch (err) {
      alert(err?.message || "Unknown error occurred");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      closeLogin();
    } catch (err) {
      alert(err?.message || "Unknown error occurred");
    }
  };

  const handleGuest = () => {
    setUser({ displayName: "Guest" });
    closeLogin();
  };

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={closeLogin}></div>
      <div className={styles.modal}>
        <div className={styles.close} onClick={closeLogin}>
          X
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
          <button type="submit">
            <Link href="/explore/for-you" className={styles.login__wrapper}>
              {isSignUp ? "Create Account" : "Sign In"}
            </Link>
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
          <Link href="/explore/for-you" className={styles.login__wrapper}>
            <figure className={styles.google__img}>
              <Image className={styles.size__img} src={google} alt="google" />
            </figure>
            <div>Sign in with Google</div>
          </Link>
        </button>

        <button
          onClick={handleGuest}
          className={`${styles.btn__wrapper} ${styles.width}`}
        >
          <Link href="/explore/for-you" className={styles.login__wrapper}>
            <figure className={styles.google__img}>
              <FaUser className={`${styles.size__img} ${styles.color}`} />
            </figure>
            <div>Continue as Guest</div>
          </Link>
        </button>
      </div>
    </>,
    document.body
  );
}
