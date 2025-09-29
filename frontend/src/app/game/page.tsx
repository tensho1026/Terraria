"use client";
import { useEffect, useRef, useState } from "react";

type Place = {
  x: number;
  y: number;
};

function Page() {
  const [playerPosition, setPlayerPosition] = useState<Place>({ x: 0, y: 0 });
  const moveX = useRef(0);

  useEffect(() => {
    const moveLoop = () => {
      setPlayerPosition((p) => {
        if (moveX.current <= 400) {
          moveX.current += 1;
          return { ...p, x: moveX.current };
        } else {
          return p;
        }
      });
      if (moveX.current <= 400) requestAnimationFrame(moveLoop);
    };
    moveLoop();
  }, []);
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

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        console.log("KeyUp");
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div>
      <p
        className="absolute top-0 left-0"
        style={{
          transform: `translate(${playerPosition.x}px, ${playerPosition.y}px)`,
        }}
      >
        ⭕️
      </p>
      <div className="absolute top-40 left-40"></div>
    </div>
  );
}

export default Page;
