import { StrictMode } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import Menu from "./Menu";
import HashiPuzzleRendered from "./HashiPuzzleRendered";
import { PuzzleView } from "./PuzzleView";
import { HashiPuzzle } from "./library/HashiPuzzle";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main Menu" component={Menu} />
          <Stack.Screen name="Puzzle" component={PuzzleView} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
