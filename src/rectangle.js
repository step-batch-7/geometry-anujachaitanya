const Point = require("./point");

const isNumberInRange = function(range, number) {
  const [lowerLimit, higherLimit] = range.sort();
  return lowerLimit <= number && higherLimit >= number;
};

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

  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    const pointA = new Point(other.a.x, other.a.y);
    const isPointAEqual = pointA.isEqualTo(this.a) || pointA.isEqualTo(this.c);
    const pointC = new Point(other.c.x, other.c.y);
    const isPointCEqual = pointC.isEqualTo(this.a) || pointC.isEqualTo(this.c);
    return isPointAEqual && isPointCEqual;
  }

  hasPoint(point) {
    if (!(point instanceof Point)) return false;
    const areXsEqual = point.x == this.a.x || point.x == this.c.x;
    const areYsEqual = point.y == this.a.y || point.y == this.c.y;
    const isXInRange = isNumberInRange([this.a.x, this.c.x], point.x);
    const isYInRange = isNumberInRange([this.a.y, this.c.y], point.y);
    return (areXsEqual && isYInRange) || (areYsEqual && isXInRange);
  }

  covers(point) {
    if (!(point instanceof Point)) return false;
    const isXInRange = isNumberInRange([this.a.x, this.c.x], point.x);
    const isYInRange = isNumberInRange([this.a.y, this.c.y], point.y);
    return isXInRange && isYInRange;
  }
}

module.exports = Rectangle;
