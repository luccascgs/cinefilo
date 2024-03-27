import React, { useState, useEffect } from "react";
import GameInput from "../../components/GameInput";
import { Container, Emojis, Title } from "./style";

export default function DailyScreen() {
  const [height, setHeight] = useState(window.innerHeight - 50);
  const [currentMovie] = useState({
    id: 6,
    name: "Matrix",
    acceptableNames: ["TheMatrix", "Matrix", "OMatrix"],
    emoji: ["💻", "🧠", "💊", "🕶️", "🐇"],
  });

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 50);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container style={{ height: height }}>
      <Title>DIÁRIO</Title>
      <Emojis>
        <span>{currentMovie.emoji[0]}</span>
        <span>{currentMovie.emoji[1]}</span>
        <span>{currentMovie.emoji[2]}</span>
        <span>{currentMovie.emoji[3]}</span>
        <span>{currentMovie.emoji[4]}</span>
      </Emojis>
      <GameInput id={1} type={1} />
      <GameInput id={2} type={2} />
      <GameInput id={3} type={2} />
      <GameInput id={4} type={2} />
      <GameInput id={5} type={2} />
    </Container>
  );
}
