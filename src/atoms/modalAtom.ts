// An atom represents a piece of state. Atoms can be read from and written to from any component. Components that read the value of an atom are implicitly subscribed to that atom, so any atom updates will result in a re-render of all components subscribed to that atom:

// Components that need to read from and write to an atom should use useRecoilState()

// import { DocumentData } from "firebase/firestore";
import { atom } from "recoil";
import { Movie } from "../typings";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const movieState = atom<Movie | null>({
  key: "movieState",
  default: null,
});
