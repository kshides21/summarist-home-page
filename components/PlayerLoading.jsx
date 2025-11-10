import Skeleton from "./Skeleton";
import styles from "./Skeleton.module.css";

export default function Loading() {
    return (
        <div style={{ padding: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
                <Skeleton width="30%" height="64px" borderRadius="12px" />
                <Skeleton width="100%" height="180px" borderRadius="12px" />
                <Skeleton width="100%" height="180px" borderRadius="12px" />
                <Skeleton width="100%" height="180px" borderRadius="12px" />
                <Skeleton width="100%" height="180px" borderRadius="12px" />
              </div>
              <div className={styles.player__footer}>
                <Skeleton width="100%" height="100%" borderRadius="4px" />
              </div>
        </div>
    )
}