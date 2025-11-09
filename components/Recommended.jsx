'use client'
import { FaRegStar, FaRegClock } from "react-icons/fa";
import styles from "../src/app/explore/for-you/page.module.css";
import Duration from "./Duration.jsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation.js";
import Skeleton from "./Skeleton.jsx";

export default function Recommended() {
const { id } = useParams();
const [loading, setLoading] = useState(true);
const [recommended, setRecommended] = useState(null);

useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
        );
        const data = await res.json();
        setRecommended(data);
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) {
  return (
    <div className={styles.recommended__books}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.book__wrapper}>
          <Skeleton width="180px" height="264px" margin="0 auto" />
        </div>
      ))}
    </div>
  );
}

  return (
    <div className={styles.recommended__books}>
      {recommended.map((book) => (
        <Link key={book.id} href={`/explore/book/${book.id}`} className={styles.book__wrapper}>
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
      ))}
      ;
    </div>
  );
}
