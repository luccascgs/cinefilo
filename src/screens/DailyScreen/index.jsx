import { useState, useEffect } from "react";
import GameInput from "../../components/GameInput";
import { Container, Emojis, Title, Emoji } from "./style";
import { checkMovie } from "../../helper/movieHelper";

export default function DailyScreen() {
  const [height, setHeight] = useState(window.innerHeight - 50);
  const [currentMovie] = useState({
    name: "Matrix",
    acceptableNames: ["TheMatrix", "Matrix", "OMatrix"],
    emojis: ["💻", "🧠", "💊", "🕶️", "🐇"],
  });
  const [currentGuess, setCurrentGuess] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [movieName, setMovieName] = useState(null);
  const [inputStates, setInputStates] = useState(Array(5).fill(2));

  function setEmojiVisibility(index) {
    return currentEmoji >= index ? 1 : 0;
  }

  function handleSubmit(value, index) {
    if (value) {
      const newInputStates = [...inputStates];
      if (checkMovie(value, currentMovie)) {
        newInputStates[index] = 4;
        setCurrentEmoji(5);
        setCurrentGuess(5);
        setMovieName(currentMovie.name);
      } else {
        newInputStates[index] = 3;
        setCurrentGuess(currentGuess + 1);
        setCurrentEmoji(currentEmoji + 1);
      }
      setInputStates(newInputStates);
    }
  }
  useEffect(() => {
    document.title = "Cinéfilo";

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
        {currentMovie.emojis.map((emoji, index) => (
          <Emoji key={index} id={index} visibility={setEmojiVisibility(index)}>
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
          value={movieName}
        />
      ))}
    </Container>
  );
}
