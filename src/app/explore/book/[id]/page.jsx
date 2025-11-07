"use client";
import styles from "./page.module.css";
import * as React from "react";
import {
  BsBook,
  BsClock,
  BsLightbulb,
  BsStar,
  BsTagFill,
} from "react-icons/bs";
import { TbMicrophone } from "react-icons/tb";
import { BsTag } from "react-icons/bs";
import Duration from "../../../../../components/Duration.jsx";
import Link from "next/link";
import { useUser } from "../../../context/UserContext.jsx";
import { useState, useEffect } from "react";

export default function BookPage({ params }) {
  const { addBookToLibrary } = useUser();
  const { id } = React.use(params);
  const [bookAdded, setBookAdded] = useState(false);
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      const data = await res.json();
      setBook(data);
    }
    fetchBook();
  }, [id]);

  return (
    <div className={styles.row}>
      <div className={styles.container}>
        { book ? (<div className={styles.inner__wrapper}>
          <div className={styles.inner__book}>
            <div className={styles.inner__title}>{book.title}</div>
            <div className={styles.inner__author}>{book.author}</div>
            <div className={styles.inner__subtitle}>{book.subTitle}</div>
            <div className={styles.inner__book__wrapper}>
              <div className={styles.inner__description__wrapper}>
                <div className={styles.inner__description}>
                  <div className={styles.inner__icon}>
                    <BsStar className={styles.inner__icon__img} />
                  </div>
                  <div className={styles.inner__overall__rating}>
                    {book.averageRating}
                  </div>
                  <div className={styles.inner__total__rating}>
                    ({book.totalRating} ratings)
                  </div>
                </div>
                <div className={styles.inner__description}>
                  <div className={styles.inner__icon}>
                    <BsClock className={styles.inner__icon__img} />
                  </div>
                  <div className={styles.inner__overall__rating}>
                    <Duration audioLink={book.audioLink} />
                  </div>
                </div>
                <div className={styles.inner__description}>
                  <div className={styles.inner__icon}>
                    <TbMicrophone className={styles.inner__icon__img} />
                  </div>
                  <div className={styles.inner__overall__rating}>
                    {book.type}
                  </div>
                </div>
                <div className={styles.inner__description}>
                  <div className={styles.inner__icon}>
                    <BsLightbulb className={styles.inner__icon__img} />
                  </div>
                  <div className={styles.inner__overall__rating}>
                    {book.keyIdeas} Key Ideas
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.read__btn__wrapper}>
              <button>
                <Link
                  className={styles.read__btn}
                  href={`/explore/player/${book.id}`}
                >
                  <div className={styles.inner__btn__icon}>
                    <BsBook className={styles.inner__btn__icon__img} />
                  </div>
                  <div className={styles.inner__btn__text}>Read</div>
                </Link>
              </button>
              <button>
                <Link
                  className={styles.read__btn}
                  href={`/explore/player/${book.id}`}
                >
                  <div className={styles.inner__btn__icon}>
                    <TbMicrophone className={styles.inner__btn__icon__img} />
                  </div>
                  <div className={styles.inner__btn__text}>Listen</div>
                </Link>
              </button>
            </div>
            {bookAdded ? (
              <div className={styles.bookmark}>
                <button className={styles.bookmark} onClick={() => addBookToLibrary(book)}>
                  <div className={styles.bookmark__icon}>
                    <BsTagFill className={styles.bookmark__icon__img} />
                  </div>
                  <div className={styles.bookmark__text__added}>
                    This title is in your Library!
                  </div>
                </button>
              </div>
            ) : (
              <div className={styles.bookmark}>
                <button className={styles.bookmark}
                  onClick={() => (addBookToLibrary(book), setBookAdded(true))}
                >
                  <div className={styles.bookmark__icon}>
                    <BsTag className={styles.bookmark__icon__img} />
                  </div>
                  <div className={styles.bookmark__text}>
                    Add title to My Library
                  </div>
                </button>
              </div>
            )}
            <div className={styles.secondary__title}>What's it about?</div>
            <div className={styles.tags__wrapper}>
              <div className={styles.inner__book__tag}>Productivity</div>
              <div className={styles.inner__book__tag}>
                Personal Development
              </div>
            </div>
            <div className={styles.inner__book__description}>
              {book.bookDescription}
            </div>
            <h2 className={styles.secondary__title}>About the author</h2>
            <div className={styles.inner__author__description}>
              {book.authorDescription}
            </div>
          </div>
          <div className={styles.book__img__wrapper}>
            <figure className={styles.book__img__figure}>
              <img
                className={styles.book__img}
                alt={book.title}
                src={book.imageLink}
              ></img>
            </figure>
          </div>
        </div>) : <div className={styles.skeleton}></div>}
      </div>
    </div>
  );
}
