class Line {
  constructor(x1, y1, x2, y2) {
    (this.p1 = [x1, y1]), (this.p2 = [x2, y2]);
  }

  toString() {
    return `Line : (${this.p1.x},${this.p1.y}), (${this.p2.x},${this.p2.x})`;
  }

  isEqualTo(line) {
    return this.p1.toString() == line.p1.toString() && this.p2.toString() == line.p2.toString();
  }
}

module.exports = { Line };
