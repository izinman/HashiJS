import { View } from "react-native";
import { HashiPuzzle } from "./library/HashiPuzzle";

export function HashiPuzzleRendered({ puzzle }: { puzzle: HashiPuzzle }) {
  let x = puzzle.height;
  return <View />; // TODO: Use canvas (?) to draw grid etc
}
