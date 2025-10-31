import styles from "./Sidebar.module.css";
import logo from "../assets/logo.png";
import Image from "next/image";
import { FaHome, FaTag, FaHighlighter, FaSearch, FaQuestionCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { FaUserGear } from "react-icons/fa6";

export default function Sidebar() {
    return (
        <div className={styles.wrapper}>
        <div className={`${styles.sidebar__overlay} ${styles.sidebar__overlay__hidden}`}></div>
        <div className={styles.sidebar__container}>
            <div className={styles.sidebar__logo}>
                <Image className={styles.sidebar__logo__img} src={logo} alt="logo"/>
            </div>
            <div className={styles.sidebar__wrapper}>
                <div className={styles.sidebar__top}>
                    <a href="" className={styles.sidebar__link__wrapper}>
                        <div className={`${styles.sidebar__link__active} ${styles.sidebar__active__line}`}></div>
                        <div className={styles.sidebar__img__wrapper}>
                            <FaHome className={styles.sidebar__img} />
                        </div>
                        <div className={styles.sidebar__link__text}>For you</div>
                    </a>
                    <a href="" className={styles.sidebar__link__wrapper}>
                        <div className={`${styles.sidebar__link__active} ${styles.sidebar__active__line}`}></div>
                        <div className={styles.sidebar__img__wrapper}>
                            <FaTag className={styles.sidebar__img} />
                        </div>
                        <div className={styles.sidebar__link__text}>Library</div>
                    </a>
                    <a href="" className={`${styles.sidebar__link__wrapper} ${styles.sidebar__noclick} `}>
                        <div className={`${styles.sidebar__link__active} ${styles.sidebar__active__line}`}></div>
                        <div className={styles.sidebar__img__wrapper}>
                            <FaHighlighter className={`${styles.sidebar__img} ${styles.sidebar__noclick}`}/>
                        </div>
                        <div className={styles.sidebar__link__text}>Highlights</div>
                    </a>
                    <a href="" className={`${styles.sidebar__link__wrapper} ${styles.sidebar__noclick} `}>
                        <div className={`${styles.sidebar__link__active} ${styles.sidebar__active__line}`}></div>
                        <div className={styles.sidebar__img__wrapper}>
                            <FaSearch className={`${styles.sidebar__img}`} />
                        </div>
                        <div className={styles.sidebar__link__text}>Search</div>
                    </a>
                </div>
                <div className={styles.sidebar__bottom}>
                    <a href="" className={styles.sidebar__link__wrapper}>
                        <div className={`${styles.sidebar__link__active} ${styles.sidebar__active__line}`}></div>
                        <div className={styles.sidebar__img__wrapper}>
                            <FaUserGear className={styles.sidebar__img} />
                        </div>
                        <div className={styles.sidebar__link__text}>Settings</div>
                    </a>
                    <a href="" className={`${styles.sidebar__link__wrapper} ${styles.sidebar__noclick} `}>
                        <div className={`${styles.sidebar__link__active} ${styles.sidebar__active__line}`}></div>
                        <div className={styles.sidebar__img__wrapper}>
                            <FaQuestionCircle className={`${styles.sidebar__img} ${styles.sidebar__noclick}`}/>
                        </div>
                        <div className={styles.sidebar__link__text}>Help & Support</div>
                    </a>
                    <a href="" className={styles.sidebar__link__wrapper}>
                        <div className={`${styles.sidebar__link__active} ${styles.sidebar__active__line}`}></div>
                        <div className={styles.sidebar__img__wrapper}>
                            <IoLogOut className={styles.sidebar__img} />
                        </div>
                        <div className={styles.sidebar__link__text}>Logout</div>
                    </a>
                </div>
            </div>
        </div>
        </div>
    )
}