const { Point } = require("./point");

const arePointsEqual = function(a, b) {
  return a.x === b.x && a.y === b.y;
};

const findIntercept = function(x, y, slope) {
  return y - slope * x;
};

const isNumberInRange = function(range, number) {
  const [lowerLimit, higherLimit] = range.sort();
  return lowerLimit <= number && higherLimit >= number;
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
    if (otherLine === this) return false;
    if (otherLine instanceof Line) {
      const yInterceptOfOtherLine = findIntercept(otherLine.a.x, otherLine.a.y, otherLine.slope);
      const yInterceptOfThisLine = findIntercept(this.a.x, this.a.y, this.slope);
      return yInterceptOfOtherLine != yInterceptOfThisLine && otherLine.slope == this.slope;
    }
    return false;
  }

  findY(x) {
    if (!isNumberInRange([this.a.x, this.b.x], x)) return NaN;
    if (this.a.y == this.b.y) return this.a.y;
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
    const firstLine = new Line({ x: this.a.x, y: this.a.y }, { x: midPoint.x, y: midPoint.y });
    const secondLine = new Line({ x: midPoint.x, y: midPoint.y }, { x: this.b.x, y: this.b.y });
    return [firstLine, secondLine];
  }

  hasPoint(point) {
    return (
      point instanceof Point && (point.x === this.findX(point.y) || point.y === this.findY(point.x))
    );
  }
}

module.exports = { Line };
