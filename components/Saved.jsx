"use client";
import { FaRegStar, FaRegClock } from "react-icons/fa";
import styles from "../src/app/explore/for-you/page.module.css";
import Duration from "./Duration.jsx";
import Link from "next/link";
import { useUser } from "../src/app/context/UserContext.jsx";
import Skeleton from "./Skeleton.jsx";

export default function Saved() {
  const { savedBooks, removeBookFromLibrary } = useUser();

  return !savedBooks ? (
    <div className={styles.recommended__books}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.book__wrapper}>
          <Skeleton width="180px" height="264px" margin="0 auto" />
        </div>
      ))}
    </div>
  ) : (
    <div className={styles.recommended__books}>
      {savedBooks.map((book) => (
        <div key={book.id} className={styles.book__wrapper__saved}>
          <Link
            href={`/explore/book/${book.id}`}
            className={styles.book__wrapper}
          >
            <div className={styles.recommended__book}>
              {book.subscriptionRequired ? (
                <div className={styles.premium}>Premium</div>
              ) : (
                <div className={styles.no__premium}></div>
              )}
              <figure className={styles.book__img__wrapper}>
                <img
                  src={book.imageLink}
                  alt={book.title}
                  className={styles.book__img}
                />
              </figure>
              <div className={styles.recommended__title}>{book.title}</div>
              <div className={styles.recommended__author}>{book.author}</div>
              <div className={styles.recommended__sub__title}>
                {book.subTitle}
              </div>
              <div className={styles.recommended__details__wrapper}>
                <div className={styles.recommended__details}>
                  <div className={styles.recommended__details__icon}>
                    <FaRegClock />
                  </div>
                  <div className={styles.recommended__details__numbers}>
                    <Duration audioLink={book.audioLink} />
                  </div>
                </div>
                <div className={styles.recommended__details}>
                  <div className={styles.recommended__details__icon}>
                    <FaRegStar />
                  </div>
                  <div className={styles.recommended__details__numbers}>
                    {book.averageRating}
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <button
            className={styles.remove__btn}
            onClick={() => removeBookFromLibrary(book.id)}
          >
            Remove Book
          </button>
        </div>
      ))}
    </div>
  );
}
