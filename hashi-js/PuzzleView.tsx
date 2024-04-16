import HashiPuzzleRendered from "./HashiPuzzleRendered";
import { PuzzleMenuBar } from "./PuzzleMenuBar";
import { StyleSheet, View } from "react-native";
import { HashiPuzzle } from "./library/HashiPuzzle";

export function PuzzleView() {
  var currentPuzzle = HashiPuzzle.createSamplePuzzle();

  // TODO: Make sure the puzzle is passed in correctly - props vs state? re-render behavior?
  return (
    <>
      <View style={styles.container}>
        <PuzzleMenuBar puzzle={currentPuzzle} />
        <HashiPuzzleRendered />
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
