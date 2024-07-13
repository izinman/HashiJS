import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { HashiPuzzle } from "./library/HashiPuzzle";
import { PuzzleEdgesContext } from "./PuzzleView";
import { useContext } from "react";

export function PuzzleMenuBar({ puzzle }: { puzzle: HashiPuzzle }) {
  const {
    puzzleEdges,
    setPuzzleEdges,
    puzzleEdgesHistory,
    setPuzzleEdgesHistory,
    puzzleEdgesHistoryIndex,
    setPuzzleEdgesHistoryIndex,
  } = useContext(PuzzleEdgesContext);
  return (
    <>
      {/* UNDO */}
      <View style={styles.container}>
        <TouchableOpacity
          disabled={puzzleEdgesHistoryIndex == 0}
          style={styles.button}
          onPress={() => {
            const newIndex = puzzleEdgesHistoryIndex - 1;
            setPuzzleEdgesHistoryIndex(newIndex);
            setPuzzleEdges(puzzleEdgesHistory[newIndex]);
          }}
        >
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>

        {/* REDO */}
        <TouchableOpacity
          disabled={puzzleEdgesHistoryIndex == puzzleEdgesHistory.length - 1}
          style={styles.button}
          onPress={() => {
            const newIndex = puzzleEdgesHistoryIndex + 1;
            setPuzzleEdgesHistoryIndex(newIndex);
            setPuzzleEdges(puzzleEdgesHistory[newIndex]);
          }}
        >
          <Text style={styles.buttonText}>Redo</Text>
        </TouchableOpacity>

        {/* START OVER */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const initialEdges = puzzle.initialEdges();
            setPuzzleEdges(initialEdges);
            setPuzzleEdgesHistory([initialEdges]);
            setPuzzleEdgesHistoryIndex(0);
          }}
        >
          <Text style={styles.buttonText}>Start over</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 300,
    maxHeight: 100,
    margin: "auto",
    backgroundColor: "#8a9da1",
    padding: 10,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#60a7bd",
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 10,
  },
});
