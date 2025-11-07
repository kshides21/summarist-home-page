"use client";
import styles from "./page.module.css";
import { useUser } from "../../context/UserContext";
import login from "../../../../assets/login.png";
import Image from "next/image";
import { useState } from "react";
import LoginModal from "../../../../components/LoginModal";

export default function Settings() {
  const { user } = useUser();
  const [showLogin, setShowLogin] = useState(false);

  const handleUpgrade = async () => {
    window.location.href = "/choose-plan";
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.row}>
        {user ? (
          <>
            <div className={styles.plan__info}>
              <h3 className={styles.plan__title}>Your Subsciption Plan</h3>
              <div className={styles.plan}>Platinum</div>
              <div className={styles.button__wrapper}>
                <button onClick={handleUpgrade} className={styles.button}>
                  Upgrade Plan
                </button>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.plan__info}>
                <h3 className={styles.plan__title}>Email</h3>
                <div className={styles.plan}>
                  {user.email ? user.email : "email@summarist.com"}
                </div>
              </div>
            </div>
          </>
        ) : (
          <figure className={styles.img__wrapper}>
            <Image className={styles.img} src={login} alt="login" />
            <h2 className={styles.button__wrapper}>
              Login to see your subsciption plan.
            </h2>
            <button
              onClick={() => setShowLogin(true)}
              className={styles.button}
            >
              Login
            </button>
          </figure>
        )}
        {showLogin && <LoginModal closeLogin={() => setShowLogin(false)} />}
      </div>
    </div>
  );
}
