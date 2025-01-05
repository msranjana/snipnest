import { createContext } from "react";

type SearchContextType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

export const SearchContext = createContext<SearchContextType>([
  false,
  () => {},
]);
