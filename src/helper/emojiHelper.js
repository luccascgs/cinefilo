import Graphemer from "graphemer";

export function splitEmojis(emojis) {
  const splitter = new Graphemer();

  return splitter.splitGraphemes(emojis);
}
