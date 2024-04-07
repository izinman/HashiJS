import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

export function PuzzleMenuBar() {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Undo")} // how to wire this up with method on puzzle i.e. puzzle.undo()
        >
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Redo")} // puzzle.redo()
        >
          <Text style={styles.buttonText}>Redo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Start over")} // puzzle.startOver()
        >
          <Text style={styles.buttonText}>Start over</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    paddingBottom: 20,
  },
  buttonText: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 300,
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
