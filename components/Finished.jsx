import { FaRegStar, FaRegClock } from "react-icons/fa";
import styles from "../src/app/explore/for-you/page.module.css";
import Duration from "./Duration.jsx";
import Link from "next/link";

export default async function Finished() {
  const res = await fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
    {
      cache: "no-store",
    }
  );

  const recommended = await res.json();

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
