import React, { useState, useEffect } from "react";
import GameInput from "../../components/GameInput";
import { Container, Emojis, Title } from "./style";

export default function DailyScreen() {
  const [height, setHeight] = useState(window.innerHeight - 50);

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
        <span>👀</span>
        <span>👀</span>
        <span>👀</span>
        <span>👀</span>
        <span>👀</span>
      </Emojis>
      <GameInput />
      <GameInput />
      <GameInput />
      <GameInput />
      <GameInput />
    </Container>
  );
}
