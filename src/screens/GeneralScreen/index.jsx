import { useState, useEffect, useCallback } from "react";
import GameInput from "../../components/GameInput";
import InfoModal from "../../components/InfoModal";
import { Container, Emojis, Title, Emoji, Loading } from "./style";
import { checkMovie } from "../../helper/movieHelper";
import { loadAllEmojis, randomizeEmojis } from "../../helper/emojiHelper";
import { api } from "../../lib/api";

export default function GeneralScreen() {
  const [height, setHeight] = useState(window.innerHeight - 50);
  const [currentMovie, setCurrentMovie] = useState({});
  const [emojiOrder, setEmojiOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [movieName, setMovieName] = useState(null);
  const [inputStates, setInputStates] = useState(Array(5).fill(2));

  const loadCurrentMovie = useCallback(async () => {
    setIsLoading(true);
    const response = await api.get("/movies/genres");
    setCurrentMovie(response.data);
    setIsLoading(false);
  }, []);

  function setEmojiVisibility(index) {
    return currentEmoji >= index ? 1 : 0;
  }

  function handleSubmit(value, index) {
    if (value) {
      const newInputStates = [...inputStates];
      if (checkMovie(value, currentMovie)) {
        newInputStates[index] = 4;

        loadAllEmojis(currentEmoji, setCurrentEmoji);
        setTimeout(() => {
          window.location.reload();
        }, 2300);

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
    setEmojiOrder(randomizeEmojis(loadCurrentMovie()));
  }, [loadCurrentMovie]);

  useEffect(() => {
    document.title = "Cinéfilo: Geral";

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <Container style={{ height: height }}>
      {isOpen && <InfoModal setIsOpen={setIsOpen} />}
      <Title>GERAL</Title>
      {isLoading ? (
        <Loading>Carregando...</Loading>
      ) : (
        <>
          <Emojis>
            {currentMovie?.emojis.map((_, index) => (
              <Emoji
                key={index}
                id={index}
                visibility={setEmojiVisibility(index)}
              >
                {currentMovie.emojis[emojiOrder[index]]}
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
        </>
      )}
    </Container>
  );
}
