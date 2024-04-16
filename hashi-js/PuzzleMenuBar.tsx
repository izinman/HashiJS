import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { HashiPuzzle } from "./library/HashiPuzzle";

export function PuzzleMenuBar({ puzzle }: { puzzle: HashiPuzzle }) {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("Undo on menu bar clicked");
            puzzle.undo();
          }}
        >
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("Redo on menu bar clicked");
            puzzle.redo();
          }}
        >
          <Text style={styles.buttonText}>Redo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("Start over on menu bar clicked");
            puzzle.startOver();
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
