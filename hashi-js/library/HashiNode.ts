export class HashiNode {
  goalNumber: number;
  xPos: number;
  yPos: number;
  isFull: boolean;
  hasConnection: boolean[];
  constructor(goal: number, x: number, y: number) {
    this.goalNumber = goal;
    this.xPos = x;
    this.yPos = y;
    this.isFull = false;
    this.hasConnection = [false, false, false, false];
  }
}
