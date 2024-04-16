import { Dimensions, FlatList, View, StyleSheet } from "react-native";
import { HashiPuzzle } from "./library/HashiPuzzle";
import GridPointView from "./GridPointView";
import { PointType } from "./PointType";

interface Props {
  puzzle: HashiPuzzle;
}

function HashiPuzzleRendered({ puzzle }: Props) {
  let puzzleWidth = puzzle.width;
  let puzzleHeight = puzzle.height;
  let points = [];

  for (let i = 0; i < puzzleHeight; i++) {
    for (let j = 0; j < puzzleWidth; j++) {
      const hashiNode = puzzle.nodes[i][j];
      const goalNumber = hashiNode ? hashiNode.goalNumber : null;
      if (i == 0 && j == 0) {
        points.push({
          goalNumber: goalNumber,
          pointType: PointType.TOP_LEFT,
        });
      } else if (i == 0 && j == puzzleWidth - 1) {
        points.push({
          goalNumber: goalNumber,
          pointType: PointType.TOP_RIGHT,
        });
      } else if (i == puzzleHeight - 1 && j == 0) {
        points.push({
          goalNumber: goalNumber,
          pointType: PointType.BOTTOM_LEFT,
        });
      } else if (i == puzzleHeight - 1 && j == puzzleWidth - 1) {
        points.push({
          goalNumber: goalNumber,
          pointType: PointType.BOTTOM_RIGHT,
        });
      } else if (i == 0) {
        points.push({
          goalNumber: goalNumber,
          pointType: PointType.FIRST_ROW,
        });
      } else if (j == 0) {
        points.push({
          goalNumber: goalNumber,
          pointType: PointType.FIRST_COLUMN,
        });
      } else if (i == puzzleHeight - 1) {
        points.push({
          goalNumber: goalNumber,
          pointType: PointType.LAST_ROW,
        });
      } else if (j == puzzleWidth - 1) {
        points.push({
          goalNumber: goalNumber,
          pointType: PointType.LAST_COLUMN,
        });
      } else {
        points.push({ goalNumber: goalNumber });
      }
    }
  }

  let pointMaxWidth = (Dimensions.get("window").width - 100) / puzzleWidth;
  let pointMaxHeight = (Dimensions.get("window").height - 300) / puzzleHeight;
  let sideLength = Math.min(pointMaxHeight, pointMaxWidth);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={points}
          renderItem={(point) => (
            <GridPointView
              style={{
                width: sideLength,
                height: sideLength,
                justifyContent: "center",
                alignItems: "center",
              }}
              goalNumber={point.item.goalNumber}
              pointType={point.item.pointType}
            />
          )}
          numColumns={puzzleWidth}
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
