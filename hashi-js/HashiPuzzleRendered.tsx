import { Dimensions, Text, FlatList, View, StyleSheet } from "react-native";
import { HashiPuzzle } from "./library/HashiPuzzle";

interface Props {
  puzzle: HashiPuzzle;
}

// function HashiPuzzleRendered(props: Props) {
function HashiPuzzleRendered() {
  let puzzleWidth = 9;
  let puzzleHeight = 9;
  let cells = [];
  for (let i = 0; i < puzzleWidth * puzzleHeight; i++) {
    cells.push({});
  }

  let cellMaxWidth = (Dimensions.get("window").width - 200) / puzzleWidth;
  let cellMaxHeight = (Dimensions.get("window").height - 200) / puzzleHeight;
  let sideLength = cellMaxHeight < cellMaxWidth ? cellMaxHeight : cellMaxWidth;

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={cells}
          renderItem={() => (
            <View
              style={{
                borderColor: "black",
                borderWidth: 0.5,
                width: sideLength,
                height: sideLength,
              }}
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
    marginHorizontal: 100,
    marginVertical: 100,
  },
});

export default HashiPuzzleRendered;
