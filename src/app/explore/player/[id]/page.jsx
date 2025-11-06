"use client";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { MdForward10, MdReplay10 } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";

export default function PlayerPage({ params }) {
  const { id } = React.use(params);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    async function fetchBook() {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      const data = await res.json();
      setPlayer(data);
    }
    fetchBook();
  }, [id]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReplay10 = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - 10, 0);
    }
  };

  const handleForward10 = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(
        audio.currentTime + 10,
        audio.duration || Infinity
      );
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onDurationChange = () => {
      const dur = audio.duration;
      console.log("durationchange event:", dur);
      if (typeof dur === "number" && !isNaN(dur) && dur > 0) {
        setDuration(dur);
      }
    };

    const onEnded = () => setIsPlaying(false);

    if (
      typeof audio.duration === "number" &&
      !isNaN(audio.duration) &&
      audio.duration > 0
    ) {
      setDuration(audio.duration);
    }

    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, [player]);

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (t) => {
    if (typeof t !== "number" || isNaN(t)) return "00:00";
    const minutes = Math.floor(Math.max(0, t) / 60);
    const seconds = Math.floor(Math.max(0, t) % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  if (!player) return <div>Loading...</div>;

  return (
    <div className={styles.summary}>
      <div className={styles.audio__summary}>
        <div className={styles.audio__title}>
          <b>{player.title}</b>
        </div>
        <div className={styles.audio__text}>{player.summary}</div>
      </div>

      <div className={styles.audio__wrapper}>
        <audio
          ref={audioRef}
          src={player.audioLink}
          preload="metadata"
          onLoadedMetadata={(e) => {
            const dur = e.target.duration;
            if (typeof dur === "number" && !isNaN(dur)) setDuration(dur);
          }}
          onTimeUpdate={(e) => {
            const t = e.target.currentTime;
            if (typeof t === "number" && !isNaN(t)) setCurrentTime(t);
          }}
          onEnded={() => setIsPlaying(false)}
        ></audio>

        <div className={styles.audio__track__wrapper}>
          <figure className={styles.book__img__wrapper}>
            <figure className={styles.book__img__wrapper__mask}>
              <img
                className={styles.book__img}
                src={player.imageLink}
                alt={player.title}
              />
            </figure>
          </figure>
          <div className={styles.audio__details__wrapper}>
            <div className={styles.audio__details__title}>{player.title}</div>
            <div className={styles.audio__details__author}>{player.author}</div>
          </div>
        </div>

        <div className={styles.audio__controls__wrapper}>
          <div className={styles.audio__controls}>
            <button
              onClick={handleReplay10}
              className={styles.audio__controls__btn}
            >
              <MdReplay10 className={styles.controls__btn} />
            </button>

            <button
              onClick={togglePlay}
              className={`${styles.play__btn} ${styles.audio__controls__btn}`}
            >
              {isPlaying ? (
                <FaPause
                  className={`${styles.controls__pause} ${styles.controls__btn}`}
                />
              ) : (
                <FaPlay
                  className={`${styles.controls__play} ${styles.controls__btn}`}
                />
              )}
            </button>

            <button
              onClick={handleForward10}
              className={styles.audio__controls__btn}
            >
              <MdForward10 className={styles.controls__btn} />
            </button>
          </div>
        </div>

        <div className={styles.audio__progress__wrapper}>
          <div className={styles.audio__time}>{formatTime(currentTime)}</div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className={`${styles.audio__time__range} ${
              isPlaying ? styles.playing : ""
            }`}
            style={{
              "--progress": `${duration ? (currentTime / duration) * 100 : 0}%`,
            }}
          />
          <div className={styles.audio__time}>{formatTime(duration)}</div>
        </div>
      </div>
    </div>
  );
}
