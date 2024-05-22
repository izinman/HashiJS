import { View, StyleSheet, DimensionValue } from "react-native";
import { LineDirection } from "./library/LineDirection";
import { HashiEdge } from "./library/HashiEdge";

function EdgeView({
  direction,
  edgeType,
  isFullLength,
}: {
  direction: LineDirection;
  edgeType: HashiEdge;
  isFullLength: Boolean;
}) {
  const opacity = edgeType == HashiEdge.NONE ? 0.4 : 1;

  let length: DimensionValue = "30%";
  if (isFullLength) length = "50%";
  else if (
    [HashiEdge.SINGLE_HORIZONTAL, HashiEdge.SINGLE_VERTICAL].includes(edgeType)
  ) {
    length = "25%";
  }

  return (
    <>
      <View
        style={{
          ...directionStylesMap(length, edgeType).get(direction)[0],
          position: "absolute",
          backgroundColor: "black",
          opacity: opacity,
        }}
      />

      {[HashiEdge.DOUBLE_HORIZONTAL, HashiEdge.DOUBLE_VERTICAL].includes(
        edgeType
      ) && (
        <View
          style={{
            ...directionStylesMap(length, edgeType).get(direction)[1],
            position: "absolute",
            backgroundColor: "black",
          }}
        />
      )}
    </>
  );
}

const styles = (
  length: DimensionValue,
  thickness: number,
  verticalOffset?: DimensionValue
) =>
  StyleSheet.create({
    left: {
      left: 0,
      height: thickness,
      width: length,
    },
    right: {
      right: 0,
      height: thickness,
      width: length,
    },
    up: {
      left: verticalOffset,
      top: 0,
      width: thickness,
      height: length,
    },
    down: {
      left: verticalOffset,
      bottom: 0,
      height: length,
      width: thickness,
    },
    top_left: {
      left: 0,
      top: "40%",
      height: thickness,
      width: length,
    },
    bottom_left: {
      left: 0,
      bottom: "40%",
      height: thickness,
      width: length,
    },
    top_right: {
      right: 0,
      top: "40%",
      height: thickness,
      width: length,
    },
    bottom_right: {
      right: 0,
      bottom: "40%",
      height: thickness,
      width: length,
    },
    left_up: {
      left: "40%",
      top: 0,
      width: thickness,
      height: length,
    },
    right_up: {
      right: "40%",
      top: 0,
      width: thickness,
      height: length,
    },
    left_down: {
      left: "40%",
      bottom: 0,
      height: length,
      width: thickness,
    },
    right_down: {
      right: "40%",
      bottom: 0,
      height: length,
      width: thickness,
    },
  });

const directionStylesMap = (length: DimensionValue, edgeType: HashiEdge) => {
  const thickness = edgeType == HashiEdge.NONE ? 1 : 3;
  const verticalOffset = edgeType == HashiEdge.NONE ? "50%" : "48%";
  if (
    ![HashiEdge.DOUBLE_HORIZONTAL, HashiEdge.DOUBLE_VERTICAL].includes(edgeType)
  ) {
    return new Map<LineDirection, any>([
      [LineDirection.LEFT, [styles(length, thickness).left]],
      [LineDirection.RIGHT, [styles(length, thickness).right]],
      [LineDirection.UP, [styles(length, thickness, verticalOffset).up]],
      [LineDirection.DOWN, [styles(length, thickness, verticalOffset).down]],
    ]);
  } else {
    return new Map<LineDirection, any>([
      [
        LineDirection.LEFT,
        [
          styles(length, thickness).top_left,
          styles(length, thickness).bottom_left,
        ],
      ],
      [
        LineDirection.RIGHT,
        [
          styles(length, thickness).top_right,
          styles(length, thickness).bottom_right,
        ],
      ],
      [
        LineDirection.UP,
        [
          styles(length, thickness).left_up,
          styles(length, thickness, verticalOffset).right_up,
        ],
      ],
      [
        LineDirection.DOWN,
        [
          styles(length, thickness).left_down,
          styles(length, thickness, verticalOffset).right_down,
        ],
      ],
    ]);
  }
};

export default EdgeView;
