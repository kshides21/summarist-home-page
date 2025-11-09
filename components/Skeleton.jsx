import React from "react";
import styles from "./Skeleton.module.css";

export default function Skeleton({ width, height, margin }) {
  return (
    <div
      style={{
        width: width || "100%",
        height: height || "20px",
        margin: margin || "0",
        borderRadius: "8px",
        background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
        backgroundSize: "400% 100%",
        animation: "skeleton-loading 1.4s ease infinite",
        flexShrink: 0,
      }}
    />
  );
}