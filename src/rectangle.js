const Point = require("./point");
class Rectangle {
  constructor(a, c) {
    this.a = new Point(a.x, a.y);
    this.b = new Point(a.x, c.y);
    this.c = new Point(c.x, c.y);
    this.d = new Point(c.x, a.y);
  }

  toString() {
    return `[Rectangle (${this.a.x},${this.a.y}) to (${this.c.x},${this.c.y})]`;
  }

  get area() {
    const length = this.a.findDistanceTo(this.b);
    const breadth = this.b.findDistanceTo(this.c);
    return length * breadth;
  }
}

module.exports = Rectangle;
