const assert = require("chai").assert;
const Point = require("../src/point");
const Line = require("../src/line");
const Circle = require("../src/circle");

describe("Point", () => {
  describe("toString", () => {
    it("should return a string representation of given point", () => {
      const point = new Point(2, 3);
      assert.strictEqual(point.toString(), "[Point @(2,3)]");
    });
  });

  describe("clone", () => {
    it("should return copy of given point", () => {
      const point = new Point(2, 3);
      assert.deepStrictEqual(point.clone(), { x: 2, y: 3 });
    });
  });

  describe("visit", () => {
    it("should return given operation", () => {
      const point = new Point(2, 3);
      assert.strictEqual(
        point.visit((x, y) => x + y),
        5
      );
    });

    it("should perform operation on single element", () => {
      const point = new Point(2, 3);
      assert.strictEqual(
        point.visit(x => x),
        2
      );
    });
  });

  describe("isEqualTo", () => {
    it("should validate two same points", () => {
      const point = new Point(2, 3);
      const otherPoint = new Point(2, 3);
      assert.ok(point.isEqualTo(otherPoint));
    });

    it("should invalidate points with different co-ordinates", () => {
      const point = new Point(2, 3);
      const otherPoint = new Point(2, 4);
      assert.notOk(point.isEqualTo(otherPoint));
    });

    it("should validate two same instances", () => {
      const point = new Point(2, 3);
      assert.ok(point.isEqualTo(point));
    });

    it("should invalidate instances from different classes", () => {
      const point = new Point(2, 3);
      assert.notOk(point.isEqualTo({ x: 2, y: 3 }));
    });
  });

  describe("findDistanceTo", () => {
    it("should return distance between given two points ", () => {
      const firstPoint = new Point(2, 3);
      const secondPoint = new Point(3, 4);
      assert.approximately(
        firstPoint.findDistanceTo(secondPoint),
        1.4142,
        0.0001
      );
    });

    it("should return zero if both points are same", () => {
      const firstPoint = new Point(2, 3);
      const secondPoint = new Point(2, 3);
      assert.strictEqual(firstPoint.findDistanceTo(secondPoint), 0);
    });

    it("should return distance if co-ordinates have floating values", () => {
      const firstPoint = new Point(7.2, 3);
      const secondPoint = new Point(2, 3.7);
      assert.approximately(
        firstPoint.findDistanceTo(secondPoint),
        5.2469,
        0.0001
      );
    });
  });

  describe("isOn", () => {
    it("should validate if point is present on line", () => {
      const point = new Point(2.5, 4);
      const line = new Line({ x: 2, y: 4 }, { x: 3, y: 4 });
      assert.ok(point.isOn(line));
    });

    it("should validate if point is a end of line", () => {
      const point = new Point(2, 3);
      const line = new Line(point, { x: 3, y: 4 });
      assert.ok(point.isOn(line));
    });

    it("should invalidate if point does not lie on line", () => {
      const point = new Point(7, 7);
      const line = new Line({ x: 2, y: 4 }, { x: 3, y: 4 });
      assert.notOk(point.isOn(line));
    });

    it("should validate if point lie on circle", () => {
      const circle = new Circle({ x: 1, y: 1 }, 5);
      const point = new Point(4, 5);
      assert.ok(point.isOn(circle));
    });

    it("should invalidate if point is not on line", () => {
      const circle = new Circle({ x: 1, y: 1 }, 5);
      const point = new Point(1, 5);
      assert.notOk(point.isOn(circle));
    });
  });
});
