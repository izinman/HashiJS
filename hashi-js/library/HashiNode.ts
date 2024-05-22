import { NodePosition } from "./NodePosition";

export class HashiNode {
  goalNumber: number;
  xPos: number;
  yPos: number;
  isFull: boolean;
  hasConnection: boolean[];
  position: NodePosition;
  constructor(goal: number, x: number, y: number, position: NodePosition) {
    this.goalNumber = goal;
    this.xPos = x;
    this.yPos = y;
    this.isFull = false;
    this.hasConnection = [false, false, false, false];
    this.position = position;
  }
}
