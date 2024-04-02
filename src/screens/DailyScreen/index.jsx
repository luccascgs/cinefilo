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
  const [currentGuess, setCurrentGuess] = useState(0);
  const [inputStates, setInputStates] = useState(Array(5).fill(2));

  function setVisibility(index) {
    return currentGuess >= index ? 1 : 0;
  }

  function handleSubmit(value, index) {
    if (value) {
      const newInputStates = [...inputStates];
      if (checkMovie(value, currentMovie)) {
        newInputStates[index] = 4;
        setCurrentGuess(6);
      } else {
        newInputStates[index] = 3;
        setCurrentGuess(currentGuess + 1);
      }
      setInputStates(newInputStates);
    }
  }

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
          <Emoji key={index} id={index} visibility={setVisibility(index)}>
            {emoji}
          </Emoji>
        ))}
      </Emojis>
      {[...Array(5)].map((_, index) => (
        <GameInput
          key={index}
          id={index + 1}
          type={index === currentGuess ? 1 : inputStates[index]}
          onSubmit={(value) => handleSubmit(value, index)}
          currentGuess={currentGuess}
          index={index}
        />
      ))}
    </Container>
  );
}
