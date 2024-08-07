import { Coordinate } from "./Coordinate";
import { HashiEdge } from "./HashiEdge";
import { HashiNode } from "./HashiNode";
import { NodePosition } from "./NodePosition";

export class HashiPuzzle {
  width: number;
  height: number;
  nodes: HashiNode[][];
  solution: HashiEdge[][];
  edges: HashiEdge[][];
  constructor(
    width: number,
    height: number,
    inputPuzzle: string,
    inputSolution: string
  ) {
    this.width = width;
    this.height = height;
    if (inputPuzzle != "") {
      this.nodes = this.parseInputPuzzle(inputPuzzle);
    }
    if (inputSolution != "") {
      this.solution = this.parseInputSolution(inputSolution);
    }
    this.edges = this.initialEdges();
  }

  undo() {
    console.log("undo on current puzzle");
  }

  redo() {
    console.log("redo on puzzle");
  }

  isSolved(): boolean {
    for (let i = 0; i < this.height; ++i) {
      for (let j = 0; j < this.width; ++j) {
        if (this.solution[i][j] != this.edges[i][j]) {
          return false;
        }
      }
    }

    return true;
  }

  drawEdge(from: Coordinate, to: Coordinate, edgeType: HashiEdge) {
    // Ensure both ends are nodes
    if (
      // TODO: test this, does mr typescript require the spooky triple equals for this check?
      this.nodes[from.x][from.y] == undefined ||
      this.nodes[to.x][to.y] == undefined
    ) {
      throw new Error(
        `Tried to draw an edge but didn't have a node at both ends. 
        From: ${from.toString} To: ${to.toString}`
      );
    }

    // Check if it crosses a node
    if (this.intersectsNode(from, to)) {
      throw new Error(
        `Tried to draw an edge over a node. 
        From: ${from.toString} To: ${to.toString}`
      );
    }

    for (let coord of from.between(to)) {
      this.edges[coord.x][coord.y] = edgeType;
    }
    // TODO maybe: check if we intersect existing edges and erase them
  }

  intersectsNode(from: Coordinate, to: Coordinate): boolean {
    let coordsBetween = from.between(to);

    for (let coord of coordsBetween) {
      if (this.nodes[coord.x][coord.y]) {
        return true;
      }
    }

    return false;
  }

  initialEdges(): HashiEdge[][] {
    let edges = new Array<Array<HashiEdge>>(this.height);

    for (let i = 0; i < this.height; ++i) {
      edges[i] = new Array<HashiEdge>(this.width);
      for (let j = 0; j < this.width; ++j) {
        edges[i][j] = HashiEdge.NONE;
      }
    }
    return edges;
  }

  parseInputSolution(inputSolution: string): HashiEdge[][] {
    let edges = new Array<Array<HashiEdge>>(this.height);

    if (inputSolution == null) {
      throw new Error("Puzzle input string was null");
    }

    for (let i = 0; i < this.height; ++i) {
      edges[i] = new Array<HashiEdge>(this.width);
    }

    let inputArray = inputSolution.split(/\s+/);
    if (inputArray.length != this.width * this.height) {
      throw new Error(
        `Input dimensions were not parsed correctly. Got ${inputArray.length}, when height is ${this.height} and width is ${this.width}`
      );
    }

    for (let i = 0; i < inputArray.length; ++i) {
      var edgeType = HashiEdge.NONE;
      switch (inputArray[i]) {
        case "1":
          edgeType = HashiEdge.SINGLE_HORIZONTAL;
          break;
        case "2":
          edgeType = HashiEdge.DOUBLE_HORIZONTAL;
        case "a":
          edgeType = HashiEdge.SINGLE_VERTICAL;
          break;
        case "b":
          edgeType = HashiEdge.DOUBLE_VERTICAL;
        case "-":
          break;
        default:
          throw new Error(
            `Unexpected input when parsing solution: ${inputArray[i]}`
          );
      }
      let x = Math.floor(i / this.height);
      let y = i % this.width;
      edges[x][y] = edgeType;
    }

    return edges;
  }

  parseInputPuzzle(inputPuzzle: string): HashiNode[][] {
    if (inputPuzzle == null) {
      throw new Error("Puzzle input string was null");
    }

    let newNodes = new Array<Array<HashiNode>>(this.height);
    for (let i = 0; i < this.height; ++i) {
      newNodes[i] = new Array<HashiNode>(this.width);
    }

    let inputArray = inputPuzzle.split(/\s+/);
    if (inputArray.length != this.width * this.height) {
      throw new Error(
        `Input dimensions were not parsed correctly. Got ${inputArray.length}, when height is ${this.height} and width is ${this.width}`
      );
    }

    for (let i = 0; i < inputArray.length; ++i) {
      let x = i % this.width;
      let y = Math.floor(i / this.height);
      var nodePos = this.getNodePos(x, y);
      if (inputArray[i] != "-") {
        var newNode = new HashiNode(parseInt(inputArray[i]), x, y, nodePos);
        newNodes[y][x] = newNode;
      } else {
        newNodes[y][x] = new HashiNode(null, x, y, nodePos);
      }
    }

    return newNodes;
  }

  getNodePos(x: number, y: number): NodePosition {
    if (x == 0) {
      if (y == 0) {
        return NodePosition.TOP_LEFT;
      } else if (y == this.height - 1) {
        return NodePosition.BOTTOM_LEFT;
      } else {
        return NodePosition.FIRST_COLUMN;
      }
    } else if (x == this.width - 1) {
      if (y == 0) {
        return NodePosition.TOP_RIGHT;
      } else if (y == this.height - 1) {
        return NodePosition.BOTTOM_RIGHT;
      } else {
        return NodePosition.LAST_COLUMN;
      }
    } else {
      if (y == 0) {
        return NodePosition.FIRST_ROW;
      } else if (y == this.height - 1) {
        return NodePosition.LAST_ROW;
      } else {
        return NodePosition.MIDDLE;
      }
    }
  }

  static createSamplePuzzle(): HashiPuzzle {
    return new HashiPuzzle(
      9,
      9,
      // puzzle
      `- 3 - 3 - - - - 2
       - - 3 - - - 1 - -
       2 - - 2 - 3 - - 4
       - - 3 - 4 - - 2 -
       3 - - - - - - - 3
       - 2 - - 5 - 3 - -
       4 - - 3 - 1 - - 1
       - - 1 - - - 2 - -
       3 - - - - 3 - 2 -`,
      // solution
      `- - 2 - 1 1 1 1 - 
       - a - 1 1 1 - - a 
       - a b - 2 - 1 1 - 
       b a - 1 - 1 1 - b 
       - a - - b - - a - 
       a - 1 1 - 2 - a a 
       - 2 2 - 1 - a a - 
       a - - 1 1 1 - a - 
       - 2 2 2 2 - 1 - -`
    );
  }
}
