import { formatText } from "./inputHelper";

export function checkMovie(input, movie) {
  const inputToCheck = formatText(input);

  const movieFound = movie.acceptableNames.find(
    (acceptableName) => inputToCheck === acceptableName.toLowerCase()
  );
  return !!movieFound;
}
