import styles from "./Sidebar.module.css";
import logo from "../assets/logo";

export default function Sidebar() {
    return (
        <div> className={styles.sidebar__container}
            <div className={styles.sidebar__logo}>
                <Image className={styles.sidebar__logo__img} src={logo} />
            </div>
        </div>
    )
}