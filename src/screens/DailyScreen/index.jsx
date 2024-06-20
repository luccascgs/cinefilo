import { useState, useEffect, useCallback } from "react";
import GameInput from "../../components/GameInput";
import { Container, Emojis, Title, Emoji, Loading } from "./style";
import { checkMovie } from "../../helper/movieHelper";
import { api } from "../../lib/api";
import { loadAllEmojis } from "../../helper/emojiHelper";
import { getTries, setTries } from "../../helper/storageHelper";

export default function DailyScreen() {
  const [height, setHeight] = useState(window.innerHeight - 50);
  const [currentMovie, setCurrentMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [movieName, setMovieName] = useState(null);
  const [moviesNames, setMoviesNames] = useState(Array(5).fill(""));
  const [inputStates, setInputStates] = useState(Array(5).fill(2));

  const loadCurrentMovie = useCallback(async () => {
    setIsLoading(true);
    const response = await api.get("/movies/daily");
    setCurrentMovie(response.data);
    setIsLoading(false);
  }, []);

  const loadMoviesNames = useCallback(() => {
    const tries = getTries();
    const updatedMoviesNames = [];

    for (let i = 0; i < 5; i++) {
      updatedMoviesNames[i] = tries[i] ?? "";
    }

    setMoviesNames(updatedMoviesNames);
  }, []);

  function setEmojiVisibility(index) {
    return currentEmoji >= index ? 1 : 0;
  }

  function handleSubmit(value, index) {
    if (value) {
      const newInputStates = [...inputStates];
      setTries(value);
      if (checkMovie(value, currentMovie)) {
        newInputStates[index] = 4;

        loadAllEmojis(currentEmoji, setCurrentEmoji);

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

  const handleResize = useCallback(() => {
    setHeight(window.innerHeight - 50);
  }, []);

  useEffect(() => {
    loadCurrentMovie();
    loadMoviesNames();
  }, [loadCurrentMovie, loadMoviesNames]);

  console.log(moviesNames);

  useEffect(() => {
    document.title = "Cinéfilo";

    window.addEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <Container style={{ height: height }}>
      <Title>DIÁRIO</Title>
      {isLoading ? (
        <Loading>Carregando...</Loading>
      ) : (
        <>
          <Emojis>
            {currentMovie.emojis.map((emoji, index) => (
              <Emoji
                key={index}
                id={index}
                visibility={setEmojiVisibility(index)}
              >
                {emoji}
              </Emoji>
            ))}
          </Emojis>
          {moviesNames?.map((name, index) => (
            <GameInput
              key={index}
              id={index + 1}
              type={index === currentGuess ? 1 : inputStates[index]}
              onSubmit={(value) => handleSubmit(value, index)}
              currentGuess={currentGuess}
              index={index}
              value={movieName ?? name}
            />
          ))}
        </>
      )}
    </Container>
  );
}
