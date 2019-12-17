const assert = require("chai").assert;
const Rectangle = require("../src/rectangle");

describe("Rectangle", () => {
  describe("toString", () => {
    it("should return string representation of given rectangle", () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      const expected = "[Rectangle (1,1) to (2,3)]";
      assert.strictEqual(rectangle.toString(), expected);
    });
  });

  describe("area", () => {
    it("should return area of rectangle all point are positive", () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 4, y: 5 });
      assert.strictEqual(rectangle.area, 12);
    });

    it("should return zero if width is zero", () => {
      const rectangle = new Rectangle({ x: 0, y: 1 }, { x: 0, y: 5 });
      assert.strictEqual(rectangle.area, 0);
    });

    it("should return area of rectangle when all points are negative", () => {
      const rectangle = new Rectangle({ x: -1, y: -1 }, { x: -5, y: -5 });
      assert.strictEqual(rectangle.area, 16);
    });
  });

  describe("perimeter", () => {
    it("should return perimeter of given rectangle with positive points", () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 4, y: 5 });
      assert.strictEqual(rectangle.perimeter, 14);
    });

    it("should return perimeter of given rectangle with negative points", () => {
      const rectangle = new Rectangle({ x: -1, y: -1 }, { x: -4, y: -5 });
      assert.strictEqual(rectangle.perimeter, 14);
    });
  });
});
