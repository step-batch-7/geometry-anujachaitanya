const { Circle } = require("../src/circle");
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
      assert.strictEqual(circle.area, 78.5);
    });

    it("should return area if radius is zero", () => {
      const circle = new Circle({ x: 1, y: 3 }, 0);
      assert.strictEqual(circle.area, 0);
    });
  });
});
