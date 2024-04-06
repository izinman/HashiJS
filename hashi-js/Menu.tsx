import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

function Menu() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Hashiwokakero</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Play")}
        >
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Tutorial")}
        >
          <Text style={styles.buttonText}>Tutorial</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Settings")}
        >
          <Text style={styles.buttonText}>Settings</Text>
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

export default Menu;
