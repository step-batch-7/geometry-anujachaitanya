const Circle = require("../src/circle");
const Point = require("../src/point");
const assert = require("chai").assert;

describe("circle", () => {
  describe("toString", () => {
    const circle = new Circle({ x: 1, y: 1 }, 5);
    it("should return string representation of given circle", () => {
      const actual = circle.toString();
      const expected = "[Circle @(1,1) radius 5]";
      assert.strictEqual(actual, expected);
    });
  });

  describe("isEqualTo", () => {
    it("should validate equal circles", () => {
      const circle = new Circle({ x: 1, y: 1 }, 5);
      const otherCircle = new Circle({ x: 1, y: 1 }, 5);
      assert.ok(circle.isEqualTo(otherCircle));
    });

    it("should invalidate two circles with same center but different radius", () => {
      const circle = new Circle({ x: 1, y: 1 }, 2);
      const otherCircle = new Circle({ x: 1, y: 1 }, 5);
      assert.notOk(circle.isEqualTo(otherCircle));
    });

    it("should invalidate two circles with same radius but different center", () => {
      const circle = new Circle({ x: 1, y: 3 }, 5);
      const otherCircle = new Circle({ x: 1, y: 1 }, 5);
      assert.notOk(circle.isEqualTo(otherCircle));
    });

    it("should invalidate instances of different classes", () => {
      const circle = new Circle({ x: 1, y: 3 }, 5);
      assert.notOk(circle.isEqualTo({ x: 1, y: 1 }, 5));
    });

    it("should validate itself ", () => {
      const circle = new Circle({ x: 1, y: 3 }, 5);
      assert.ok(circle.isEqualTo(circle));
    });
  });

  describe("area", () => {
    it("should return area of circle for given center and point", () => {
      const circle = new Circle({ x: 1, y: 3 }, 5);
      assert.approximately(circle.area, 78.539, 0.001);
    });

    it("should return area if radius is zero", () => {
      const circle = new Circle({ x: 1, y: 3 }, 0);
      assert.strictEqual(circle.area, 0);
    });
  });

  describe("perimeter", () => {
    it("should return perimeter for given circle", () => {
      const circle = new Circle({ x: 1, y: 3 }, 5);
      assert.approximately(circle.perimeter, 31.415, 0.001);
    });

    it("should return perimeter for zero as radius", () => {
      const circle = new Circle({ x: 1, y: 3 }, 0);
      assert.strictEqual(circle.perimeter, 0);
    });
  });

  describe("hasPoint", () => {
    it("should validate if point is on the circumference", () => {
      const circle = new Circle({ x: 1, y: 1 }, 5);
      const point = new Point(4, 5);
      assert.ok(circle.hasPoint(point));
    });

    it("should invalidate if point is not on line", () => {
      const circle = new Circle({ x: 1, y: 1 }, 5);
      const point = new Point(1, 5);
      assert.notOk(circle.hasPoint(point));
    });

    it("should invalidate if given is not point", () => {
      const circle = new Circle({ x: 1, y: 1 }, 5);
      assert.notOk(circle.hasPoint({ x: 1, y: 1 }));
    });
  });

  describe("moveTo", () => {
    it("should create new circle for given parameters", () => {
      const firstCircle = new Circle({ x: 1, y: 4 }, 5);
      const movedCircle = new Circle({ x: 3, y: 4 }, 5);
      const point = new Point(3, 4);
      assert.deepStrictEqual(firstCircle.moveTo(point), movedCircle);
    });

    it("should return null if given is not point", () => {
      const firstCircle = new Circle({ x: 1, y: 4 }, 5);
      const movedCircle = new Circle({ x: 3, y: 4 }, 5);
      assert.isNull(firstCircle.moveTo({ x: 3, y: 4 }));
    });
  });

  describe("covers", () => {
    it("should validate if point is on circle", () => {
      const circle = new Circle({ x: 1, y: 4 }, 5);
      const point = new Point(2, 3);
      assert.ok(circle.covers(point));
    });

    it("should invalidate point on circumference", () => {
      const circle = new Circle({ x: 1, y: 4 }, 5);
      const point = new Point(6, 4);
      assert.notOk(circle.covers(point));
    });

    it("should invalidate if given is not point", () => {
      const circle = new Circle({ x: 1, y: 4 }, 5);
      assert.notOk(circle.covers({ x: 1, y: 4 }));
    });

    it("should invalidate if the given point is outside of the circle", function() {
      const circle = new Circle({ x: 1, y: 1 }, 8);
      const point = new Point(1, 9.5);
      assert.notOk(circle.covers(point));
    });
  });
});
