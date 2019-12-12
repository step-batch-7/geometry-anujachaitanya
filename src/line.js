class Line {
  constructor(x1, y1, x2, y2) {
    (this.a = [x1, y1]), (this.b = [x2, y2]);
  }

  toString() {
    return `Line : (${this.a.x},${this.a.y}), (${this.b.x},${this.b.x})`;
  }

  isEqualTo(anotherLine) {
    return (
      this.a.toString() == anotherLine.a.toString() && this.b.toString() == anotherLine.b.toString()
    );
  }
}

module.exports = { Line };
