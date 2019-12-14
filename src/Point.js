class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `[Point @(${this.x},${this.y})]`;
  }

  isEqualTo(otherPoint) {
    return otherPoint instanceof Point && otherPoint.x == this.x && otherPoint.y == this.y;
  }
  clone() {
    return new Point(this.x, this.y);
  }

  visit(funcReference) {
    return funcReference(this.x, this.y);
  }
}

module.exports = { Point };
