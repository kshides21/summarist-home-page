"use client";
import { useEffect, useState } from "react";

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "—";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function Duration({ audioLink }) {
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (!audioLink) return;
    const audio = document.createElement("audio");
    audio.src = audioLink;
    audio.preload = "metadata";
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    return () => audio.remove();
  }, [audioLink]);

  return <>{duration ? formatTime(duration) : "Loading..."}</>;
}
