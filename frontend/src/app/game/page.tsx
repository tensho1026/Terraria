"use client";
import { useEffect, useState } from "react";

function Page() {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPlayerPosition((p) => {
        if (e.key === "ArrowRight") return { ...p, x: p.x + 10 };
        if (e.key === "ArrowLeft") return { ...p, x: p.x - 10 };
        if (e.key === "ArrowDown") return { ...p, y: p.y + 10 };
        if (e.key === "ArrowUp") return { ...p, y: p.y - 10 };
        return p;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div>
      <p
        className="absolute top-0 left-0"
        style={{
          transform: `translate(${playerPosition.x}px, ${playerPosition.y}px)`,
        }}>
        ⭕️
      </p>
      <div className="absolute top-40 left-40"></div>
    </div>
  );
}

export default Page;
