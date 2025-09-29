"use client";
import { useState } from "react";

function Page() {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const handleDown = () => {
    setPlayerPosition({ x: playerPosition.x, y: playerPosition.y + 10 });
  };
  return (
    <div>
      <p
        className="absolute top-0 left-0"
        style={{
          transform: `translate(${playerPosition.x}px, ${playerPosition.y}px)`,
        }}>
        ⭕️
      </p>
      <div className="absolute top-40 left-40">
        <button onClick={handleDown}>↓</button>
      </div>
    </div>
  );
}

export default Page;
