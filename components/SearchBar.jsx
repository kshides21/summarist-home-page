'use-client'
import styles from "./Sidebar.module.css";
import { FaSearch } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";

export default function SearchBar() {
    return (
        <div className={styles.search__background}>
        <div className={styles.search__wrapper}>
            <figure>
                <img></img>
            </figure>
            <div className={styles.search__content}>
            <div className={styles.search}>
            <div className={styles.search__input__wrapper}>
                <input type="text" placeholder="Search for books" className={styles.search__input} />
                <div className={styles.search__icons}>
                    <FaSearch className={styles.search__icon} />
                </div>
            </div>

            </div>
            <div className={styles.search__sidebar__toggle}></div>
                <LuMenu className={`${styles.hidden} ${styles.search__icon}`} />
            </div>
        </div>
        </div>
    )
}