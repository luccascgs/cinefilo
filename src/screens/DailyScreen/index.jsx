import { useState, useEffect } from "react";
import GameInput from "../../components/GameInput";
import { Container, Emojis, Title, Emoji } from "./style";
import { checkMovie } from "../../helper/movieHelper";

export default function DailyScreen() {
  const [height, setHeight] = useState(window.innerHeight - 50);
  const [currentMovie] = useState({
    id: 6,
    name: "Matrix",
    acceptableNames: ["TheMatrix", "Matrix", "OMatrix"],
    emoji: ["💻", "🧠", "💊", "🕶️", "🐇"],
  });

  const handleSubmit = (value) => {
    if (value) {
      console.log(checkMovie(value, currentMovie));
    }
  };

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
        {currentMovie.emoji.map((emoji, index) => (
          <Emoji key={index} id={index} visibility="false">
            {emoji}
          </Emoji>
        ))}
      </Emojis>
      {[...Array(5)].map((_, index) => (
        <GameInput
          key={index}
          id={index + 1}
          type={2}
          onSubmit={handleSubmit}
        />
      ))}
    </Container>
  );
}
