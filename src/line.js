const arePointsEqual = function(a, b) {
  return a.x === b.x && a.y === b.y;
};

class Line {
  constructor(x1, y1, x2, y2) {
    (this.a = [x1, y1]), (this.b = [x2, y2]);
  }

  toString() {
    return `Line : (${this.a.x},${this.a.y}), (${this.b.x},${this.b.x})`;
  }

  isEqualTo(anotherLine) {
    return arePointsEqual(this.a, anotherLine.a) && arePointsEqual(this.b, anotherLine.b);
  }
}

module.exports = { Line };
