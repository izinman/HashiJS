import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const image = { uri: "assets/hashi-background.jpeg" };

function Menu({ navigation }) {
  return (
    <>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View
          style={{
            position: "absolute",
            left: "50%",
            top: "30%",
            transform: "translate(-50%, -50%)",
          }}
        ></View>

        <View style={styles.container}>
          <Text style={styles.header}>Hashiwokakero</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("Play");
              navigation.push("Puzzle");
            }} // Open PuzzleView
          >
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Tutorial")} // Open TutorialView
          >
            <Text style={styles.buttonText}>Tutorial</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Settings")} // etc...
          >
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
  image: {
    flex: 1,
  },
});

export default Menu;
