import { store } from "../redux/store";

export const toCamelCase = (input) =>
  input
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, "");

export const REGEX = {
  EMAIL_ID: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
  PASSWORD:
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}[\]:;<>,.?~])(?=.{8,})[a-zA-Z0-9!@#$%^&*()_+={}[\]:;<>,.?~]+$/,
};

export const getTokenFromStore = () => {
  const state = store.getState();
  const token = state.auth.userData?.accessToken;
  return token;
};
