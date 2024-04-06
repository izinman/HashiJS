import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, View } from "react-native";
import Menu from "./Menu";

const image = { uri: "assets/hashi-background.jpeg" };

export default function App() {
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
        >
          <Menu />
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
