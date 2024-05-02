import { View, StyleSheet, DimensionValue } from "react-native";
import { LineDirection } from "./library/LineDirection";
import { HashiEdge } from "./library/HashiEdge";

function EdgeView({
  length,
  direction,
  edgeType,
}: {
  length: DimensionValue;
  direction: LineDirection;
  edgeType: HashiEdge;
}) {
  return (
    <View
      style={{
        ...directionStylesMap(length).get(direction),
        ...connectionStylesMap.get(edgeType),
      }}
    />
  );
}

const styles = (length?: DimensionValue) =>
  StyleSheet.create({
    no_connection: {
      position: "absolute",
      backgroundColor: "black",
      opacity: 0.4,
    },
    connection: {
      position: "absolute",
      backgroundColor: "black",
      opacity: 0.4,
    },
    left: {
      left: 0,
      height: 1,
      width: length,
    },
    right: {
      right: 0,
      height: 1,
      width: length,
    },
    up: {
      left: "50%",
      top: 0,
      width: 1,
      height: length,
    },
    down: {
      left: "50%",
      bottom: 0,
      height: length,
      width: 1,
    },
  });

const directionStylesMap = (length?: DimensionValue) =>
  new Map<LineDirection, any>([
    [LineDirection.LEFT, styles(length).left],
    [LineDirection.RIGHT, styles(length).right],
    [LineDirection.UP, styles(length).up],
    [LineDirection.DOWN, styles(length).down],
  ]);

const connectionStylesMap = new Map([
  [HashiEdge.NONE, styles().no_connection],
  [HashiEdge.SINGLE_HORIZONTAL, styles().connection],
  [HashiEdge.SINGLE_VERTICAL, styles().connection],
  [HashiEdge.DOUBLE_HORIZONTAL, styles().connection],
  [HashiEdge.DOUBLE_VERTICAL, styles().connection],
]);

export default EdgeView;
