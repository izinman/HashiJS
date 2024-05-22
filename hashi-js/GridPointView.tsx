import { Pressable, Text, View, StyleSheet } from "react-native";
import { NodePosition } from "./library/NodePosition";
import { HashiNode } from "./library/HashiNode";
import EdgeView from "./EdgeView";
import { LineDirection } from "./library/LineDirection";
import { HashiEdge } from "./library/HashiEdge";

function GridPointView({
  sideLength,
  node,
  edges,
  onClick,
  isSelectedNode,
}: {
  sideLength: number;
  node: HashiNode;
  edges: HashiEdge[][];
  onClick: (node: HashiNode) => void;
  isSelectedNode: Boolean;
}) {
  const onPress = () => {
    onClick(node);
  };

  function getEdgeType(direction: LineDirection) {
    let edgeType: HashiEdge;
    if (node.goalNumber == null) edgeType = edges[node.yPos][node.xPos];
    else if (direction == LineDirection.LEFT)
      edgeType = edges[node.yPos][node.xPos - 1];
    else if (direction == LineDirection.RIGHT)
      edgeType = edges[node.yPos][node.xPos + 1];
    else if (direction == LineDirection.UP)
      edgeType = edges[node.yPos - 1][node.xPos];
    else edgeType = edges[node.yPos + 1][node.xPos];

    if (
      [HashiEdge.SINGLE_HORIZONTAL, HashiEdge.DOUBLE_HORIZONTAL].includes(
        edgeType
      ) &&
      ![LineDirection.LEFT, LineDirection.RIGHT].includes(direction)
    )
      return HashiEdge.NONE;
    else if (
      [HashiEdge.SINGLE_VERTICAL, HashiEdge.DOUBLE_VERTICAL].includes(
        edgeType
      ) &&
      ![LineDirection.UP, LineDirection.DOWN].includes(direction)
    ) {
      return HashiEdge.NONE;
    }

    return edgeType;
  }

  return (
    <View
      style={{
        ...styles.parent,
        width: sideLength,
        height: sideLength,
      }}
    >
      {node.goalNumber && (
        <Pressable
          onPress={onPress}
          style={{ ...styles.node, borderWidth: isSelectedNode ? 3 : 1 }}
        >
          <Text style={{ fontWeight: isSelectedNode ? "bold" : "normal" }}>
            {node.goalNumber}
          </Text>
        </Pressable>
      )}

      {![
        NodePosition.TOP_LEFT,
        NodePosition.BOTTOM_LEFT,
        NodePosition.FIRST_COLUMN,
      ].includes(node.position) && (
        <EdgeView
          direction={LineDirection.LEFT}
          edgeType={getEdgeType(LineDirection.LEFT)}
          isFullLength={node.goalNumber == null}
        />
      )}

      {![
        NodePosition.TOP_RIGHT,
        NodePosition.BOTTOM_RIGHT,
        NodePosition.LAST_COLUMN,
      ].includes(node.position) && (
        <EdgeView
          direction={LineDirection.RIGHT}
          edgeType={getEdgeType(LineDirection.RIGHT)}
          isFullLength={node.goalNumber == null}
        />
      )}

      {![
        NodePosition.TOP_LEFT,
        NodePosition.TOP_RIGHT,
        NodePosition.FIRST_ROW,
      ].includes(node.position) && (
        <EdgeView
          direction={LineDirection.UP}
          edgeType={getEdgeType(LineDirection.UP)}
          isFullLength={node.goalNumber == null}
        />
      )}

      {![
        NodePosition.BOTTOM_RIGHT,
        NodePosition.BOTTOM_LEFT,
        NodePosition.LAST_ROW,
      ].includes(node.position) && (
        <EdgeView
          direction={LineDirection.DOWN}
          edgeType={getEdgeType(LineDirection.DOWN)}
          isFullLength={node.goalNumber == null}
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
    backgroundColor: "white",
    zIndex: 1,
  },
});

export default GridPointView;
