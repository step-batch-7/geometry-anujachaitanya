const Point = require("./point");
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
    return (
      point instanceof Point && this.center.findDistanceTo(point) == this.radius
    );
  }

  moveTo(point) {
    return new Circle({ x: point.x, y: point.y }, this.radius);
  }

  covers(point) {
    const dx = point.x - this.center.x;
    const dy = (point.y = this.center.y);
    return dx ** 2 + dy ** 2 <= this.radius ** 2;
  }
}

module.exports = Circle;
