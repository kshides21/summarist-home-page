import { FaPlayCircle } from "react-icons/fa";
import styles from "../src/app/explore/for-you/page.module.css";
import Link from "next/link";

export default async function Selected() {
  const res = await fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
    {
      cache: "no-store",
    }
  );

  const selected = await res.json();

  return (
    <Link href={`/explore/book/${selected[0].id}`} className={styles.container__selected}>
      <div className={styles.selected__sub__title}>{selected[0].subTitle}</div>
      <div className={styles.selected__line}></div>
      <div className={styles.selected__content}>
        <figure className={styles.selected__img__wrapper}>
          <img
            src={selected[0].imageLink}
            alt={selected[0].title}
            className={styles.selected__img}
          ></img>
        </figure>
        <div className={styles.selected__text}>
          <div className={styles.selected__title}>{selected[0].title}</div>
          <div className={styles.selected__author}>{selected[0].author}</div>
          <div className={styles.selected__duration}>
            <div className={styles.selected__duration__img}>
              <FaPlayCircle className={styles.selected__play}/>
            </div>
            <div className={styles.selected__duration__number}>
              3 mins 23 secs
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
