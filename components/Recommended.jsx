import { FaRegStar, FaRegClock } from "react-icons/fa";
import styles from "../src/app/explore/for-you/page.module.css";

export default async function Recommended() {
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
        <a key={book.id} href="" className={styles.book__wrapper}>
          <div className={styles.recommended__book}>
            <figure className={styles.book__img__wrapper}><img
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
                  {book.averageRating}
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
        </a>
      ))}
      ;
    </div>
  );
}
