import Recommended from "../../../components/Recommended";
import Selected from "../../../components/Selected";
import Suggested from "../../../components/Suggested";
import styles from "./page.module.css";

export default function ForYou() {
    return (
        <section>
            <div className={styles.container}>
                <div className={styles.row}>
                    <h1>Selected Just For You</h1>
                    <Selected />
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.row}>
                    <h1>Recommended For You</h1>
                    <h2>We think you'll like these.</h2>
                    <Recommended />
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.row}>
                    <h1>Suggested Books</h1>
                    <h2>Browse our picks.</h2>
                    <Suggested />
                </div>
            </div>
        </section>
    )
};