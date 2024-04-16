import { Text, View, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface Props {
  style: StyleProp<ViewStyle>;
  goalNumber?: number;
}

function GridPoint({ style, goalNumber }: Props) {
  return (
    <View style={style}>
      {goalNumber ? (
        <View style={styles.node}>
          <Text>{goalNumber}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  node: {
    textAlign: "center",
    height: "50%",
    width: "50%",
    borderRadius: 1000,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GridPoint;
