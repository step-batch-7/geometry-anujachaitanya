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
});
