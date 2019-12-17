const { Point } = require("./point");
class Circle {
  constructor(point, radius) {
    this.center = new Point(point.x, point.y);
    this.radius = radius;
  }

  toString() {
    return `[Circle @(${this.center.x},${this.center.y}) radius ${this.radius}]`;
  }

  isEqualTo(otherCircle) {
    return (
      otherCircle instanceof Circle &&
      this.center.isEqualTo(otherCircle.center) &&
      this.radius == otherCircle.radius
    );
  }

  get area() {
    return Math.PI * this.radius * this.radius;
  }

  get perimeter() {
    return 2 * Math.PI * this.radius;
  }

  hasPoint(point) {
    return this.center.findDistanceTo(point) == this.radius;
  }
}

module.exports = { Circle };
