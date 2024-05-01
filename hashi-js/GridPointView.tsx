import {
  Text,
  View,
  StyleProp,
  StyleSheet,
  ViewStyle,
  DimensionValue,
} from "react-native";
import { NodePosition } from "./library/NodePosition";
import { HashiNode } from "./library/HashiNode";

function GridPointView({
  sideLength,
  node,
}: {
  sideLength: number;
  node: HashiNode;
}) {
  let lineLength: DimensionValue = node.goalNumber ? "25%" : "50%";
  return (
    <View
      style={{
        ...styles.parent,
        ...{
          width: sideLength,
          height: sideLength,
        },
      }}
    >
      {node.goalNumber && (
        <View style={styles.node}>
          <Text style={{ userSelect: "none" }}>{node.goalNumber}</Text>
        </View>
      )}

      {![
        NodePosition.TOP_LEFT,
        NodePosition.BOTTOM_LEFT,
        NodePosition.FIRST_COLUMN,
      ].includes(node.nodePosition) && (
        // Left Line
        <View
          style={{
            ...styles.backgroundLine,
            ...{
              left: 0,
              height: 1,
              width: lineLength,
            },
          }}
        />
      )}

      {![
        NodePosition.TOP_RIGHT,
        NodePosition.BOTTOM_RIGHT,
        NodePosition.LAST_COLUMN,
      ].includes(node.nodePosition) && (
        // Right Line
        <View
          style={{
            ...styles.backgroundLine,
            ...{
              right: 0,
              height: 1,
              width: lineLength,
            },
          }}
        />
      )}

      {![
        NodePosition.TOP_LEFT,
        NodePosition.TOP_RIGHT,
        NodePosition.FIRST_ROW,
      ].includes(node.nodePosition) && (
        // Up Line
        <View
          style={{
            ...styles.backgroundLine,
            ...{
              left: "50%",
              top: 0,
              height: lineLength,
              width: 1,
            },
          }}
        />
      )}

      {![
        NodePosition.BOTTOM_RIGHT,
        NodePosition.BOTTOM_LEFT,
        NodePosition.LAST_ROW,
      ].includes(node.nodePosition) && (
        // Down Line
        <View
          style={{
            ...styles.backgroundLine,
            ...{
              left: "50%",
              bottom: 0,
              height: lineLength,
              width: 1,
            },
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    justifyContent: "center",
    alignItems: "center",
  },
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
  backgroundLine: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.4,
  },
});

export default GridPointView;
