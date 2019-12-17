const Point = require("./point");

const isNumberInRange = function(range, number) {
  const [lowerLimit, higherLimit] = range.sort();
  return lowerLimit <= number && higherLimit >= number;
};

const arePointsCollinear = function(pointA, pointB, pointC) {
  const [x1, y1] = [pointA.x, pointA.y];
  const [x2, y2] = [pointB.x, pointB.y];
  const [x3, y3] = [pointC.x, pointC.y];
  return x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2) == 0;
};

const getPointFromDistance = function(a, b, distance, length) {
  const ratio = distance / length;
  const x = (1 - ratio) * a.x + ratio * b.x;
  const y = (1 - ratio) * a.y + ratio * b.y;
  return new Point(x, y);
};

class Line {
  constructor(pointA, pointB) {
    this.a = new Point(pointA.x, pointA.y);
    this.b = new Point(pointB.x, pointB.y);
  }

  toString() {
    return `[Line (${this.a.x},${this.a.y}) to (${this.b.x},${this.b.y})]`;
  }

  isEqualTo(otherLine) {
    return (
      otherLine instanceof Line &&
      ((this.a.isEqualTo(otherLine.a) && this.b.isEqualTo(otherLine.b)) ||
        (this.a.isEqualTo(otherLine.b) && this.b.isEqualTo(otherLine.a)))
    );
  }

  get length() {
    return this.a.findDistanceTo(this.b);
  }

  get slope() {
    const slope = (this.b.y - this.a.y) / (this.b.x - this.a.x);
    return slope == -Infinity ? Infinity : slope;
  }

  isParallelTo(otherLine) {
    if (!(otherLine instanceof Line)) return false;
    const areSlopesEqual = this.slope == otherLine.slope;
    return areSlopesEqual && !arePointsCollinear(this.a, this.b, otherLine.a);
  }

  findY(x) {
    if (!isNumberInRange([this.a.x, this.b.x], x)) return NaN;
    if (this.a.x == this.b.x) return this.a.y;
    const dx = x - this.a.x;
    return dx * this.slope + this.a.y;
  }

  findX(y) {
    if (!isNumberInRange([this.a.y, this.b.y], y)) return NaN;
    if (this.a.y == this.b.y) return this.a.x;
    const dy = y - this.a.y;
    return dy / this.slope + this.a.x;
  }

  split() {
    let midPoint = {};
    midPoint.x = (this.a.x + this.b.x) / 2;
    midPoint.y = (this.a.y + this.b.y) / 2;
    const firstLine = new Line(
      { x: this.a.x, y: this.a.y },
      { x: midPoint.x, y: midPoint.y }
    );
    const secondLine = new Line(
      { x: midPoint.x, y: midPoint.y },
      { x: this.b.x, y: this.b.y }
    );
    return [firstLine, secondLine];
  }

  hasPoint(point) {
    return point.x === this.findX(point.y) || point.y === this.findY(point.x);
  }

  findPointFromStart(distance) {
    const point = getPointFromDistance(this.a, this.b, distance, this.length);
    if (isNaN(point.x) || isNaN(point.y)) {
      return undefined;
    }
    return point;
  }

  findPointFromEnd(distance) {
    const point = getPointFromDistance(this.b, this.a, distance, this.length);
    if (isNaN(point.x) || isNaN(point.y)) {
      return undefined;
    }
    return point;
  }
}

module.exports = Line;
