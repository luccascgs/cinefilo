import { formatText } from "./inputHelper";

export function checkMovie(input, movie) {
  const inputToCheck = formatText(input);

  const movieFound = movie.acceptableNames.find(
    (acceptableName) =>
      inputToCheck.toLowerCase() === acceptableName.toLowerCase()
  );
  return !!movieFound;
}
