class HashiPuzzle {
  width: number;
  height: number;
  nodes: HashiNode[][];
  constructor(width: number, height: number, inputPuzzle: string) {
    this.width = width;
    this.height = height;
    this.nodes = this.parseInputPuzzle(inputPuzzle);
  }

  parseInputPuzzle(input: string): HashiNode[][] {
    let newNodes: HashiNode[][] = [];
    for (let i = 0; i < this.height; ++i) {
      newNodes.push([]);
      for (let j = 0; j < this.width; ++j) {
        newNodes[i].push(null);
      }
    }
    let inputArray = input.split(/\s+/);
    if (inputArray.length != this.width * this.height) {
      // panik
      throw new Error("bruhMoment");
    } else {
      console.log("all is good fam");
    }
    for (let i = 0; i < inputArray.length; ++i) {
      if (inputArray[i] != "-") {
        let x = i / this.height;
        let y = i % this.width;
        newNodes[x][y] = new HashiNode(x, y, parseInt(inputArray[i]));
      }
    }

    return newNodes;
  }

  static testPuzzleParse(): HashiPuzzle {
    return new HashiPuzzle(
      9,
      9,
      `- 3 - 3 - - - - 2
          - - 3 - - - 1 - -
          2 - - 2 - 3 - - 4
          - - 3 - 4 - - 2 -
          3 - - - - - - - 3
          - 2 - - 5 - 3 - -
          4 - - 3 - 1 - - 1
          - - 1 - - - 2 - -
          3 - - - - 3 - 2 -`
    );
  }
}
