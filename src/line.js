class Line {
  constructor(x1, y1, x2, y2) {
    (this.p1 = [x1, y1]), (this.p2 = [x2, y2]);
  }

  toString() {
    return `line : { p1 : (${this.p1[0]},${this.p1[1]}), p2 : (${this.p2[0]},${this.p2[1]}) }`;
  }

  isEqualTo(line) {
    return this.p1.toString() == line.p1.toString() && this.p2.toString() == line.p2.toString();
  }
}

module.exports = { Line };
