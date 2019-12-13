const arePointsEqual = function(a, b) {
  return a.x === b.x && a.y === b.y;
};

class Line {
  constructor(pointA, pointB) {
    this.a = { x: pointA.x, y: pointA.y };
    this.b = { x: pointB.x, y: pointB.y };
  }

  toString() {
    return `Line : (${this.a.x},${this.a.y}), (${this.b.x},${this.b.x})`;
  }

  isEqualTo(otherLine) {
    if (!otherLine instanceof Line) return false;
    return arePointsEqual(this.a, otherLine.a) && arePointsEqual(this.b, otherLine.b);
  }
}

module.exports = { Line };
