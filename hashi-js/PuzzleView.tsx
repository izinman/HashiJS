import HashiPuzzleRendered from "./HashiPuzzleRendered";
import { PuzzleMenuBar } from "./PuzzleMenuBar";
import { StyleSheet, View } from "react-native";
import { useState, createContext } from "react";
import { HashiPuzzle } from "./library/HashiPuzzle";
import { HashiEdge } from "./library/HashiEdge";

interface PuzzleEdgeContextType {
  puzzleEdges: HashiEdge[][];
}
export const PuzzleEdgesContext = createContext(null);

const PuzzleContextProvider = ({ edges, children }) => {
  const [puzzleEdges, setPuzzleEdges] = useState(edges);
  const [puzzleEdgesHistory, setPuzzleEdgesHistory] = useState([edges]);
  const [puzzleEdgesHistoryIndex, setPuzzleEdgesHistoryIndex] = useState(0);

  return (
    <PuzzleEdgesContext.Provider
      value={{
        puzzleEdges,
        setPuzzleEdges,
        puzzleEdgesHistory,
        setPuzzleEdgesHistory,
        puzzleEdgesHistoryIndex,
        setPuzzleEdgesHistoryIndex,
      }}
    >
      {children}
    </PuzzleEdgesContext.Provider>
  );
};

export function PuzzleView() {
  var currentPuzzle = HashiPuzzle.createSamplePuzzle();

  // TODO: Make sure the puzzle is passed in correctly - props vs state? re-render behavior?
  return (
    <>
      <View style={styles.container}>
        <PuzzleContextProvider
          edges={currentPuzzle.edges}
          children={
            <>
              <PuzzleMenuBar puzzle={currentPuzzle} />
              <HashiPuzzleRendered puzzle={currentPuzzle} />
            </>
          }
        />
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
