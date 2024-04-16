import { Dimensions, FlatList, View, StyleSheet } from "react-native";
import { HashiPuzzle } from "./library/HashiPuzzle";
import GridPoint from "./GridPoint";
import { PuzzleMenuBar } from "./PuzzleMenuBar";

interface Props {
  puzzle: HashiPuzzle;
}

// function HashiPuzzleRendered(props: Props) {
function HashiPuzzleRendered() {
  let puzzleWidth = 9;
  let puzzleHeight = 9;
  let cells = [];

  for (let i = 0; i < puzzleHeight + 1; i++) {
    for (let j = 0; j < puzzleWidth + 1; j++) {
      if (i == 0 && j == 0) {
        cells.push({ goalNumber: null, nodeType: "topLeft" });
      } else if (i == 0 && j == puzzleWidth) {
        cells.push({ goalNumber: null, nodeType: "topRight" });
      } else if (i == puzzleHeight && j == 0) {
        cells.push({ goalNumber: null, nodeType: "bottomLeft" });
      } else if (i == puzzleHeight && j == puzzleWidth) {
        cells.push({ goalNumber: null, nodeType: "bottomRight" });
      } else if (i == 0) {
        cells.push({ goalNumber: null, nodeType: "firstRow" });
      } else if (j == 0) {
        cells.push({ goalNumber: null, nodeType: "firstColumn" });
      } else if (i == puzzleHeight) {
        cells.push({ goalNumber: null, nodeType: "lastRow" });
      } else if (j == puzzleWidth) {
        cells.push({ goalNumber: null, nodeType: "lastColumn" });
      } else {
        cells.push({ goalNumber: null, nodeType: null });
      }
    }
  }

  let cellMaxWidth = (Dimensions.get("window").width - 100) / (puzzleWidth + 1);
  let cellMaxHeight =
    (Dimensions.get("window").height - 100) / (puzzleHeight + 1);
  let sideLength = Math.min(cellMaxHeight, cellMaxWidth);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={cells}
          renderItem={(cell) => (
            <GridPoint
              style={{
                width: sideLength,
                height: sideLength,
                justifyContent: "center",
                alignItems: "center",
              }}
              goalNumber={cell.item.goalNumber}
              nodeType={cell.item.nodeType}
            />
          )}
          numColumns={puzzleWidth + 1}
          scrollEnabled={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 50,
  },
});

export default HashiPuzzleRendered;
