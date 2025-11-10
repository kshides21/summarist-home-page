import Skeleton from "./Skeleton";
import styles from "./Skeleton.module.css";

export default function Loading() {
  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className={styles.skeleton__book__info}>
          <div className={styles.skeleton__book__img}>
            <Skeleton width="100%" height="100%" borderRadius="12px" />
          </div>
          <div className={styles.skeleton__book__description}>
          <Skeleton width="100%" height="100%" borderRadius="12px" />

          </div>
        </div>
        <div className={styles.skeleton__book__text}>
          <Skeleton width="100%" height="100%" borderRadius="12px" />
        </div>
      </div>
    </div>
  );
}
