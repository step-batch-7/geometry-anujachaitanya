const arePointsEqual = function(a, b) {
  return a.x === b.x && a.y === b.y;
};

class Line {
  constructor(pointA, pointB) {
    (this.a = pointA), (this.b = pointB);
  }

  toString() {
    return `Line : (${this.a.x},${this.a.y}), (${this.b.x},${this.b.x})`;
  }

  isEqualTo(anotherLine) {
    let lineEqual = arePointsEqual(this.a, anotherLine.a) && arePointsEqual(this.b, anotherLine.b);
    const isTypeEqual = anotherLine instanceof Line;
    return isTypeEqual && lineEqual;
  }
}

module.exports = { Line };
