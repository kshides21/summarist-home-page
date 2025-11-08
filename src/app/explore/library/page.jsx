"use client";
import styles from "./page.module.css";
import { useUser } from "../../context/UserContext";
import login from "../../../../assets/login.png";
import Image from "next/image";
import { useState } from "react";
import LoginModal from "../../../../components/LoginModal";
import Finished from "../../../../components/Finished"
import Saved from "../../../../components/Saved"

export default function Library() {
  const [showLogin, setShowLogin] = useState(false);
  const { user, savedBooks, finishedBooks } = useUser();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Library</h1>
      <div className={styles.row}>
        {user ? (
          <>
            <div className={styles.plan__info}>
              <h3 className={styles.plan__title}>Saved Books</h3>
              { savedBooks.length === 1 ? (<div className={styles.books__count}>1 book</div>) : (<div className={styles.books__count}>{savedBooks.length} books</div>)}
              {savedBooks.length === 0 ? 
                <div className={styles.nobook__container}>
                  <div className={styles.nobook__wrapper}>
                    <h3 className={styles.finished__none__title}>Save you Favorites!</h3>
                    <div className={styles.finished__none__description}>Save a book to you collection so you can come back to it later!</div>
                  </div> 
                </div> 
                : <Saved />}
            </div>
            <div className={styles.row}>
              <div className={styles.plan__info}>
                <h3 className={styles.plan__title}>Finished Books</h3>
                { finishedBooks.length === 1 ? (<div className={styles.books__count}>1 book</div>) : (<div className={styles.books__count}>{finishedBooks.length} books</div>)}
                {finishedBooks.length === 0 ? 
                <div className={styles.nobook__container}>
                  <div className={styles.nobook__wrapper}>
                    <h3 className={styles.finished__none__title}>Done and Dusted</h3>
                    <div className={styles.finished__none__description}>When you finish a book you can check it back out here.</div>
                  </div> 
                </div> 
                : <Finished />}
              </div>
            </div>
          </>
        ) : (
          <figure className={styles.img__wrapper}>
            <Image className={styles.img} src={login} alt="login" />
            <h2 className={styles.button__wrapper}>
              Login to see your Library.
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
