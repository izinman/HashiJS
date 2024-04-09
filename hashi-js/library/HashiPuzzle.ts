import { Coordinate } from "./Coordinate";
import { HashiEdge } from "./HashiEdge";
import { HashiNode } from "./HashiNode";

export class HashiPuzzle {
  width: number;
  height: number;
  nodes: HashiNode[][];
  solution: HashiEdge[][];
  currentEdges: HashiEdge[][];
  constructor(
    width: number,
    height: number,
    inputPuzzle: string,
    inputSolution: string
  ) {
    this.width = width;
    this.height = height;
    this.nodes = this.parseInputPuzzle(inputPuzzle);
    this.solution = this.parseInputSolution(inputSolution);
    this.currentEdges = this.initializeEdges();
  }

  undo() {
    console.log("undo on current puzzle");
  }

  redo() {
    console.log("redo on puzzle");
  }

  startOver() {
    this.currentEdges = this.initializeEdges();
  }

  isSolved(): boolean {
    for (let i = 0; i < this.height; ++i) {
      for (let j = 0; j < this.width; ++j) {
        if (this.solution[i][j] != this.currentEdges[i][j]) {
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
      this.currentEdges[coord.x][coord.y] = edgeType;
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

  initializeEdges(): HashiEdge[][] {
    let edges = new Array<Array<HashiEdge>>(this.height);

    for (let i = 0; i < this.height; ++i) {
      edges[i] = new Array<HashiEdge>(this.width);
      for (let j = 0; j < this.width; ++j) {
        edges[i][j] = HashiEdge.None;
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
      throw new Error("Input dimensions were not parsed correctly");
    }

    for (let i = 0; i < inputArray.length; ++i) {
      var edgeType = HashiEdge.None;
      switch (inputArray[i]) {
        case "1":
          edgeType = HashiEdge.SingleHorizontal;
          break;
        case "2":
          edgeType = HashiEdge.DoubleHorizontal;
        case "a":
          edgeType = HashiEdge.SingleVertical;
          break;
        case "b":
          edgeType = HashiEdge.DoubleVertical;
        case "-":
          break;
        default:
          throw new Error(
            `Unexpected input when parsing solution: ${inputArray[i]}`
          );
      }
      let x = i / this.height;
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
      throw new Error("Input dimensions were not parsed correctly");
    }

    for (let i = 0; i < inputArray.length; ++i) {
      if (inputArray[i] != "-") {
        let x = i / this.height;
        let y = i % this.width;
        newNodes[x][y] = new HashiNode(x, y, parseInt(inputArray[i], 10));
      }
    }

    return newNodes;
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
       - 2 2 2 2 - 1 - - `
    );
  }
}
