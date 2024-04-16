import { StatusBar } from "expo-status-bar";
import { StrictMode } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Menu from "./Menu";
import HashiPuzzleRendered from "./HashiPuzzleRendered";

const image = { uri: "assets/hashi-background.jpeg" };

export default function App() {
  return (
    <>
      <StrictMode>
        <HashiPuzzleRendered />
        {/* comment out the ImageBackground and uncomment this line to view the puzzle */}
        {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View
          style={{
            position: "absolute",
            left: "50%",
            top: "30%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Menu />
          <StatusBar style="auto" />
        </View>
      </ImageBackground> */}
      </StrictMode>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
