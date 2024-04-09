import { HashiPuzzleRendered } from "./HashiPuzzleRendered";
import { PuzzleMenuBar } from "./PuzzleMenuBar";
import { HashiPuzzle } from "./library/HashiPuzzle";
import { StyleSheet, View } from "react-native";

export function PuzzleView(puzzleObject: HashiPuzzle) {
  // TODO: Make sure the puzzle is passed in correctly - props vs state? re-render behavior?
  return (
    <>
      <View style={styles.container}>
        <PuzzleMenuBar puzzle={puzzleObject} />
        <HashiPuzzleRendered puzzle={puzzleObject} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
