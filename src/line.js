const arePointsEqual = function(a, b) {
  return a.x === b.x && a.y === b.y;
};

const findIntercept = function(line) {
  const m = line.slope;
  return line.a.y - m * line.a.x;
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
      const yInterceptOfOtherLine = findIntercept(otherLine);
      const yInterceptOfThisLine = findIntercept(this);
      return yInterceptOfOtherLine != yInterceptOfThisLine && otherLine.slope == this.slope;
    }
    return false;
  }

  findY(x) {
    if (!isNumberInRange([this.a.x, this.b.x], x)) return NaN;
    if (this.slope === Infinity) return this.a.y;
    const dx = x - this.a.x;
    return dx * this.slope + this.a.y;
  }
}

module.exports = { Line };
