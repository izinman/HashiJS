import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "bootstrap/dist/css/bootstrap.css";
import Menu from "./Menu";

export default function App() {
  return (
    <View style={styles.container}>
      <Menu />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
