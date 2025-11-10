"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Sidebar.module.css";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Skeleton from "./Skeleton";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const API_URL =
    "https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle";

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    setShowDropdown(true);

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_URL}?search=${encodeURIComponent(query)}`
        );
        const data = await res.json();

        setResults(Array.isArray(data) ? data : []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.search__background}>
      <div className={styles.search__wrapper} ref={dropdownRef}>
        <figure>
          <img></img>
        </figure>
        <div className={styles.search__input__wrapper}>
          <input
            type="text"
            placeholder="Search for books..."
            className={styles.search__input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setShowDropdown(true)}
          />
          <div className={styles.search__icons}>
            <FaSearch className={styles.search__icon} />
          </div>
        </div>
        {showDropdown && (
          <ul className={styles.search__dropdown}>
            {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={styles.search__item}>
                      <Skeleton width="354px" height="56px" margin="auto" />
                    </div>
                  ))
                ) : results.length > 0 ? (
              results.map((book) => (
                <li
                  key={book.id}
                  className={styles.search__item}
                  onClick={() => {
                    setShowDropdown(false);
                    setQuery("");
                    router.push(`/explore/book/${book.id}`);
                  }}
                >
                  <img
                    src={book.imageLink || "/placeholder.png"}
                    alt={book.title}
                    className={styles.search__item__img}
                  />
                  <div className={styles.search__item__info}>
                    <div className={styles.search__item__title}>
                      {book.title}
                    </div>
                    <div className={styles.search__item__author}>
                      {book.author}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className={styles.search__noresults}>No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
