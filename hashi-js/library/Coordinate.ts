export class Coordinate {
  x: number = 0;
  y: number = 0;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(other: Coordinate): boolean {
    return this.x == other.x && this.y == other.y;
  }

  toString(): string {
    return `[x: ${this.x}, y:${this.y}]`;
  }

  between(other: Coordinate): Array<Coordinate> {
    if (this.equals(other)) {
      throw new Error("Invalid call to between: two of the same point");
    }
    let values = new Array<Coordinate>();
    if (this.x != other.x) {
      if (this.y != other.y) {
        // has to be vertical or horizontal
        throw new Error("Invalid call to between: diagonal coordinates");
      } else {
        let max = Math.max(this.x, other.x);
        let min = Math.min(this.x, other.x);
        if (max - min < 2) {
          // difference must be at least 2
          throw new Error(
            "Invalid call to between: tried to find the coordinates between two adjacent points"
          );
        }
        for (let i = min; i < max; ++i) {
          values.push(new Coordinate(i, this.y));
        }
      }
    } else {
      let max = Math.max(this.y, other.y);
      let min = Math.min(this.y, other.y);
      if (max - min < 2) {
        // difference must be at least 2
        throw new Error(
          "Invalid call to between: tried to find the coordinates between two adjacent points"
        );
      }
      for (let i = min; i < max; ++i) {
        values.push(new Coordinate(this.x, i));
      }
    }
    return values;
  }
}
