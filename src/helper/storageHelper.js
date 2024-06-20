const ACCESS_TOKEN_KEY = "@cinefilo:access_token";

export function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getTries() {
  const tries = localStorage.getItem("tries");
  if (tries) return JSON.parse(tries);
  localStorage.setItem("tries", JSON.stringify([]));
  return [];
}

export function setTries(trie) {
  const oldTries = getTries();
  const tries = [...oldTries, trie];

  localStorage.setItem("tries", JSON.stringify(tries));
}
