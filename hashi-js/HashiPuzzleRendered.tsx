import { Dimensions, FlatList, View, StyleSheet } from "react-native";
import { HashiPuzzle } from "./library/HashiPuzzle";
import GridPointView from "./GridPointView";
import { NodePosition } from "./library/NodePosition";

interface Props {
  puzzle: HashiPuzzle;
}

function HashiPuzzleRendered({ puzzle }: Props) {
  let puzzleWidth = puzzle.width;
  let puzzleHeight = puzzle.height;

  let pointMaxWidth = (Dimensions.get("window").width - 100) / puzzleWidth;
  let pointMaxHeight = (Dimensions.get("window").height - 300) / puzzleHeight;
  let sideLength = Math.min(pointMaxHeight, pointMaxWidth);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={puzzle.nodes.flat()}
          renderItem={(point) =>
            point.item.goalNumber != -1 ? (
              <GridPointView
                style={{
                  width: sideLength,
                  height: sideLength,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                goalNumber={point.item.goalNumber}
                pointType={point.item.nodePosition}
              />
            ) : (
              <></>
            )
          }
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
