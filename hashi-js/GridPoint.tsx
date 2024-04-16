import {
  Text,
  View,
  StyleProp,
  StyleSheet,
  ViewStyle,
  DimensionValue,
} from "react-native";

interface Props {
  style: StyleProp<ViewStyle>;
  goalNumber?: number;
  nodeType: string;
}

function GridPoint({ style, goalNumber, nodeType }: Props) {
  let lineLength: DimensionValue = goalNumber ? "25%" : "50%";
  return (
    <View style={style}>
      {goalNumber ? (
        <View style={styles.node}>
          <Text>{goalNumber}</Text>
        </View>
      ) : null}

      {/* Change To Enums */}
      {!["topLeft", "bottomLeft", "firstColumn"].includes(nodeType) ? (
        // Left Line
        <View
          style={{
            position: "absolute",
            left: 0,
            height: 1,
            width: lineLength,
            backgroundColor: "black",
          }}
        />
      ) : null}

      {!["topRight", "bottomRight", "lastColumn"].includes(nodeType) ? (
        // Right Line
        <View
          style={{
            position: "absolute",
            right: 0,
            height: 1,
            width: lineLength,
            backgroundColor: "black",
          }}
        />
      ) : null}

      {!["topLeft", "topRight", "firstRow"].includes(nodeType) ? (
        // Up Line
        <View
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            height: lineLength,
            width: 1,
            backgroundColor: "black",
          }}
        />
      ) : null}

      {!["bottomRight", "bottomLeft", "lastRow"].includes(nodeType) ? (
        // Down Line
        <View
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            height: lineLength,
            width: 1,
            backgroundColor: "black",
          }}
        />
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
