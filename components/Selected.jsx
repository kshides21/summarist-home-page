"use client";
import { useParams } from "next/navigation";
import { FaPlayCircle } from "react-icons/fa";
import styles from "../src/app/explore/for-you/page.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import Skeleton from "./Skeleton";

export default function Selected() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
        );
        const data = await res.json();
        setSelected(data);
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
      <div className={styles.skeleton__selected}>
        <Skeleton width="100%" height="192px" />
      </div>
    );
  }

  return (
    <Link
      href={`/explore/book/${selected[0].id}`}
      className={styles.container__selected}
    >
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
              <FaPlayCircle className={styles.selected__play} />
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
