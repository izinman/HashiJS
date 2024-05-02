import {
  Pressable,
  Text,
  View,
  StyleSheet,
  DimensionValue,
} from "react-native";
import { NodePosition } from "./library/NodePosition";
import { HashiNode } from "./library/HashiNode";
import EdgeView from "./EdgeView";
import { LineDirection } from "./library/LineDirection";
import { HashiEdge } from "./library/HashiEdge";

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
        width: sideLength,
        height: sideLength,
      }}
    >
      {node.goalNumber && (
        <Pressable style={styles.node}>
          <Text style={{ userSelect: "none" }}>{node.goalNumber}</Text>
        </Pressable>
      )}

      {![
        NodePosition.TOP_LEFT,
        NodePosition.BOTTOM_LEFT,
        NodePosition.FIRST_COLUMN,
      ].includes(node.nodePosition) && (
        <EdgeView
          length={lineLength}
          direction={LineDirection.LEFT}
          edgeType={HashiEdge.NONE}
        />
      )}

      {![
        NodePosition.TOP_RIGHT,
        NodePosition.BOTTOM_RIGHT,
        NodePosition.LAST_COLUMN,
      ].includes(node.nodePosition) && (
        <EdgeView
          length={lineLength}
          direction={LineDirection.RIGHT}
          edgeType={HashiEdge.NONE}
        />
      )}

      {![
        NodePosition.TOP_LEFT,
        NodePosition.TOP_RIGHT,
        NodePosition.FIRST_ROW,
      ].includes(node.nodePosition) && (
        <EdgeView
          length={lineLength}
          direction={LineDirection.UP}
          edgeType={HashiEdge.NONE}
        />
      )}

      {![
        NodePosition.BOTTOM_RIGHT,
        NodePosition.BOTTOM_LEFT,
        NodePosition.LAST_ROW,
      ].includes(node.nodePosition) && (
        <EdgeView
          length={lineLength}
          direction={LineDirection.DOWN}
          edgeType={HashiEdge.NONE}
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
