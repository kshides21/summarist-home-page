"use client";
import styles from "./Sidebar.module.css";
import logo from "../assets/logo.png";
import Image from "next/image";
import {
  FaHome,
  FaTag,
  FaHighlighter,
  FaSearch,
  FaQuestionCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { FaUserGear } from "react-icons/fa6";
import Link from "next/link";
import { useUser } from "../src/app/context/UserContext";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { user, logout } = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div
        className={styles.burger__menu}
        onClick={toggleMenu}
      >
        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>

      <div
        className={`${styles.sidebar__overlay} ${
          menuOpen ? styles.sidebar__overlay__visible : styles.sidebar__overlay__hidden
        }`}
        onClick={closeMenu}
      ></div>

      <div
        className={`${styles.sidebar__container} ${
          menuOpen ? styles.sidebar__container__open : ""
        }`}
      >
        <div className={styles.sidebar__logo}>
          <Image className={styles.sidebar__logo__img} src={logo} alt="logo" />
        </div>
        <div className={styles.sidebar__wrapper}>
          <div className={styles.sidebar__top}>
            <Link
              href="/explore/for-you"
              className={`${styles.sidebar__link__wrapper} ${
                pathname === "/explore/for-you" ? styles.active : ""
              }`}
              onClick={closeMenu}
            >
              <div className={styles.sidebar__img__wrapper}>
                <FaHome className={styles.sidebar__img} />
              </div>
              <div className={styles.sidebar__link__text}>For you</div>
            </Link>
            <Link
              href="/explore/library"
              className={`${styles.sidebar__link__wrapper} ${
                pathname === "/explore/library" ? styles.active : ""
              }`}
              onClick={closeMenu}
            >
              <div className={styles.sidebar__img__wrapper}>
                <FaTag className={styles.sidebar__img} />
              </div>
              <div className={styles.sidebar__link__text}>Library</div>
            </Link>
            <Link
              href=""
              className={`${styles.sidebar__link__wrapper} ${styles.sidebar__noclick} `}
            >
              <div className={styles.sidebar__img__wrapper}>
                <FaHighlighter
                  className={`${styles.sidebar__img} ${styles.sidebar__noclick}`}
                />
              </div>
              <div className={styles.sidebar__link__text}>Highlights</div>
            </Link>
            <Link
              href=""
              className={`${styles.sidebar__link__wrapper} ${styles.sidebar__noclick} `}
            >
              <div className={styles.sidebar__img__wrapper}>
                <FaSearch className={`${styles.sidebar__img}`} />
              </div>
              <div className={styles.sidebar__link__text}>Search</div>
            </Link>
          </div>
          <div className={styles.sidebar__bottom}>
            <Link
              href="/explore/settings"
              className={`${styles.sidebar__link__wrapper} ${
                pathname === "/explore/settings" ? styles.active : ""
              }`}
              onClick={closeMenu}
            >
              <div className={styles.sidebar__img__wrapper}>
                <FaUserGear className={styles.sidebar__img} />
              </div>
              <div className={styles.sidebar__link__text}>Settings</div>
            </Link>
            <Link
              href=""
              className={`${styles.sidebar__link__wrapper} ${styles.sidebar__noclick} `}
            >
              <div className={styles.sidebar__img__wrapper}>
                <FaQuestionCircle
                  className={`${styles.sidebar__img} ${styles.sidebar__noclick}`}
                />
              </div>
              <div className={styles.sidebar__link__text}>Help & Support</div>
            </Link>
            <Link href="" className={styles.sidebar__link__wrapper} onClick={closeMenu}>
              <div className={styles.sidebar__img__wrapper}>
                <IoLogOut className={styles.sidebar__img} />
              </div>
              {user ? (
                <div
                  onClick={() => logout}
                  className={styles.sidebar__link__text}
                >
                  Logout
                </div>
              ) : (
                <div
                  onClick={() => setShowLogin(true)}
                  className={styles.sidebar__link__text}
                >
                  Login
                </div>
              )}
            </Link>
            {showLogin && <LoginModal closeLogin={() => setShowLogin(false)} />}
          </div>
        </div>
      </div>
    </>
  );
}
