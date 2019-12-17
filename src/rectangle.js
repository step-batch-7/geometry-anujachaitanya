const Point = require("./point");
const Line = require("./line");

const getLengthAndWidth = function(a, c) {
  const length = Math.abs(a.x - c.x);
  const breadth = Math.abs(a.y - c.y);
  return [length, breadth];
};

class Rectangle {
  constructor(a, c) {
    this.a = new Point(a.x, a.y);
    this.c = new Point(c.x, c.y);
  }

  toString() {
    return `[Rectangle (${this.a.x},${this.a.y}) to (${this.c.x},${this.c.y})]`;
  }

  get area() {
    const [length, breadth] = getLengthAndWidth(this.a, this.c);
    return length * breadth;
  }

  get perimeter() {
    const [length, breadth] = getLengthAndWidth(this.a, this.c);
    return 2 * (length + breadth);
  }
}

module.exports = Rectangle;
