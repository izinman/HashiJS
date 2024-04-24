import {
  Text,
  View,
  StyleProp,
  StyleSheet,
  ViewStyle,
  DimensionValue,
} from "react-native";
import { NodePosition } from "./library/NodePosition";

interface Props {
  style: StyleProp<ViewStyle>;
  goalNumber?: number;
  pointType?: NodePosition;
}

function GridPointView({ style, goalNumber, pointType }: Props) {
  let lineLength: DimensionValue = goalNumber ? "25%" : "50%";
  return (
    <View style={style}>
      {goalNumber ? (
        <View style={styles.node}>
          <Text style={{ userSelect: "none" }}>{goalNumber}</Text>
        </View>
      ) : null}

      {![
        NodePosition.TOP_LEFT,
        NodePosition.BOTTOM_LEFT,
        NodePosition.FIRST_COLUMN,
      ].includes(pointType) ? (
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

      {![
        NodePosition.TOP_RIGHT,
        NodePosition.BOTTOM_RIGHT,
        NodePosition.LAST_COLUMN,
      ].includes(pointType) ? (
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

      {![
        NodePosition.TOP_LEFT,
        NodePosition.TOP_RIGHT,
        NodePosition.FIRST_ROW,
      ].includes(pointType) ? (
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

      {![
        NodePosition.BOTTOM_RIGHT,
        NodePosition.BOTTOM_LEFT,
        NodePosition.LAST_ROW,
      ].includes(pointType) ? (
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

export default GridPointView;
