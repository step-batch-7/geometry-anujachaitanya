const Line = require("../src/line").Line;
const assert = require("chai").assert;

describe("Line", () => {
  const line = new Line(1, 1, 1, 1);
  describe("toString", () => {
    it("should return toString representation of given points", () => {
      const actual = line.toString();
      const expected = "line : { p1 : (1,1), p2 : (1,1) }";
      assert.strictEqual(actual, expected);
    });
  });

  describe("isEqualTo", () => {
    it("should validate two equal lines", () => {
      const line2 = new Line(1, 1, 1, 1);
      assert.ok(line.isEqualTo(line2));
    });
  });
});
