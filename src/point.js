class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `[Point @(${this.x},${this.y})]`;
  }

  isEqualTo(otherPoint) {
    return (
      otherPoint instanceof Point &&
      otherPoint.x == this.x &&
      otherPoint.y == this.y
    );
  }
  clone() {
    return new Point(this.x, this.y);
  }

  visit(action) {
    return action(this.x, this.y);
  }

  findDistanceTo(point) {
    if(!(point instanceof Point)) return NaN;
    const differenceInXs = this.x - point.x;
    const differenceInYs = this.y - point.y;
    return Math.sqrt(differenceInXs ** 2 + differenceInYs ** 2);
  }

  isOn(shape) {
    return shape.hasPoint(this);
  }
}

module.exports = Point ;
