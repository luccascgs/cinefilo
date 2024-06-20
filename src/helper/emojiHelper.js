import Graphemer from "graphemer";

export function splitEmojis(emojis) {
  const splitter = new Graphemer();

  return splitter.splitGraphemes(emojis);
}

export function loadAllEmojis(currentEmojiValue, setCurrentEmoji) {
  setCurrentEmoji(currentEmojiValue + 1);
  setTimeout(() => {
    if (currentEmojiValue <= 2) {
      loadAllEmojis(currentEmojiValue + 1, setCurrentEmoji);
    }
  }, 500);
}

export function randomizeEmojis(movie) {
  const sortedNumber = [];
  while (sortedNumber.length < 5) {
    const number = Math.floor(Math.random() * 5);
    if (sortedNumber.indexOf(number) === -1) {
      sortedNumber.push(number);
    }
  }

  return sortedNumber;
}
