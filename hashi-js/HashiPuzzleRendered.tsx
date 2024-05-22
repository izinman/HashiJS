import { Dimensions, FlatList, View, StyleSheet } from "react-native";
import { useState } from "react";
import { HashiPuzzle } from "./library/HashiPuzzle";
import GridPointView from "./GridPointView";
import { HashiNode } from "./library/HashiNode";
import { HashiEdge } from "./library/HashiEdge";

interface Props {
  puzzle: HashiPuzzle;
}

function HashiPuzzleRendered({ puzzle }: Props) {
  let puzzleWidth = puzzle.width;
  let puzzleHeight = puzzle.height;
  // const [history, setHistory] = useState(
  //   Array(puzzleHeight)
  //     .fill("-")
  //     .map(() => new Array(puzzleWidth).fill("-"))
  // )

  let pointMaxWidth = (Dimensions.get("window").width - 100) / puzzleWidth;
  let pointMaxHeight = (Dimensions.get("window").height - 300) / puzzleHeight;
  let sideLength = Math.min(pointMaxHeight, pointMaxWidth);

  const [selectedNode, setSelectedNode] = useState(null);
  const [connections, setConnections] = useState(puzzle.edges);
  // const [nodes, setNodes] = useState(puzzle.nodes);

  function toggleConnectionType(node: HashiNode) {
    if (selectedNode == null) {
      setSelectedNode(node);
      return;
    }

    if (node == selectedNode) {
      setSelectedNode(null);
      return;
    }

    if (node.xPos != selectedNode.xPos && node.yPos != selectedNode.yPos) {
      setSelectedNode(node);
      return;
    }

    const connectionsCopy = structuredClone(connections);
    if (node.yPos == selectedNode.yPos) {
      const start = Math.min(node.xPos, selectedNode.xPos);
      const end = Math.max(node.xPos, selectedNode.xPos);

      for (let i = start + 1; i < end; i++) {
        if (puzzle.nodes[node.yPos][i].goalNumber != null) {
          setSelectedNode(node);
          return;
        }

        const currentConnectionType = connectionsCopy[node.yPos][i];
        if (
          ![
            HashiEdge.NONE,
            HashiEdge.SINGLE_HORIZONTAL,
            HashiEdge.DOUBLE_HORIZONTAL,
          ].includes(currentConnectionType)
        ) {
          setSelectedNode(node);
          return;
        }
        connectionsCopy[node.yPos][i] = nextConnectionTypeMap(false).get(
          currentConnectionType
        );
      }
    } else {
      const start = Math.min(node.yPos, selectedNode.yPos);
      const end = Math.max(node.yPos, selectedNode.yPos);

      for (let i = start + 1; i < end; i++) {
        if (puzzle.nodes[i][node.xPos].goalNumber != null) {
          setSelectedNode(node);
          return;
        }

        const currentConnectionType = connectionsCopy[i][node.xPos];
        if (
          ![
            HashiEdge.NONE,
            HashiEdge.SINGLE_VERTICAL,
            HashiEdge.DOUBLE_VERTICAL,
          ].includes(currentConnectionType)
        ) {
          setSelectedNode(node);
          return;
        }
        connectionsCopy[i][node.xPos] = nextConnectionTypeMap(true).get(
          currentConnectionType
        );
      }
    }

    setConnections(connectionsCopy);
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={puzzle.nodes.flat()}
          renderItem={(point) => (
            <GridPointView
              onClick={toggleConnectionType}
              sideLength={sideLength}
              edges={connections}
              node={point.item}
              isSelectedNode={point.item == selectedNode}
            />
          )}
          numColumns={puzzleWidth}
          scrollEnabled={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 50,
  },
});

const nextConnectionTypeMap = (isVertical: Boolean) => {
  if (isVertical) {
    return new Map<HashiEdge, HashiEdge>([
      [HashiEdge.NONE, HashiEdge.SINGLE_VERTICAL],
      [HashiEdge.SINGLE_VERTICAL, HashiEdge.DOUBLE_VERTICAL],
      [HashiEdge.DOUBLE_VERTICAL, HashiEdge.NONE],
    ]);
  } else {
    return new Map<HashiEdge, HashiEdge>([
      [HashiEdge.NONE, HashiEdge.SINGLE_HORIZONTAL],
      [HashiEdge.SINGLE_HORIZONTAL, HashiEdge.DOUBLE_HORIZONTAL],
      [HashiEdge.DOUBLE_HORIZONTAL, HashiEdge.NONE],
    ]);
  }
};

export default HashiPuzzleRendered;
