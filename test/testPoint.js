const assert = require("chai").assert;
const { Point } = require("../src/point");

describe("Point", () => {
  describe("toString", () => {
    it("should return a string representation of given point", () => {
      const point = new Point(2, 3);
      assert.strictEqual(point.toString(), "[Point @(2,3)]");
    });
  });
});
