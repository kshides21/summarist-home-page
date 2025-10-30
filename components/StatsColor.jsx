'use client'
import { useEffect, useState } from "react";

export default function StatisticColor({phrases}) {

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 1500);

    return () => clearInterval(interval);
    }, [phrases.length]);

    return (
    <div className="statistics__content--header">
      {phrases.map((text, index) => (
        <div
          key={index}
          className={`statistics__heading ${
            index === activeIndex ? "statistics__heading--active" : ""
          }`}
        >
          {text}
        </div>
      ))}
    </div>
  );

}