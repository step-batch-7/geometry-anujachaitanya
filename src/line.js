const { Point } = require("./point");

const arePointsEqual = function(a, b) {
  return a.x === b.x && a.y === b.y;
};

const findYIntercept = function(point, slope) {
  return point.y - slope * point.x;
};

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

class Line {
  constructor(pointA, pointB) {
    this.a = { x: pointA.x, y: pointA.y };
    this.b = { x: pointB.x, y: pointB.y };
  }

  toString() {
    return `[Line (${this.a.x},${this.a.y}) to (${this.b.x},${this.b.x})]`;
  }

  isEqualTo(otherLine) {
    return (
      otherLine instanceof Line &&
      arePointsEqual(this.a, otherLine.a) &&
      arePointsEqual(this.b, otherLine.b)
    );
  }

  get length() {
    const differenceInXs = this.a.x - this.b.x;
    const differenceInYs = this.a.y - this.b.y;
    return Math.sqrt(differenceInXs ** 2 + differenceInYs ** 2);
  }

  get slope() {
    return (this.b.y - this.a.y) / (this.b.x - this.a.x);
  }

  isParallelTo(otherLine) {
    if (!(otherLine instanceof Line)) return false;
    const areSlopesEqual = this.slope == otherLine.slope;
    return areSlopesEqual && !arePointsCollinear(this.a, this.b, otherLine.a);
  }

  findY(x) {
    if (!isNumberInRange([this.a.x, this.b.x], x)) return NaN;
    const dx = x - this.a.x;
    const y = dx * this.slope + this.a.y;
    if (isNaN(y)) {
      return this.a.y;
    }
    return y;
  }

  findX(y) {
    if (!isNumberInRange([this.a.y, this.b.y], y)) return NaN;
    const dy = y - this.a.y;
    const x = dy / this.slope + this.a.x;
    if (isNaN(x)) {
      return this.a.x;
    }
    return x;
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
    return (
      point instanceof Point &&
      (point.x === this.findX(point.y) || point.y === this.findY(point.x))
    );
  }
}

module.exports = { Line };
