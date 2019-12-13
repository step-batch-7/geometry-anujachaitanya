const { Line } = require("../src/line");
const assert = require("chai").assert;

describe("Line", () => {
  const line = new Line({ x: 1, y: 1 }, { x: 1, y: 1 });
  describe("toString", () => {
    it("should return string representation of given line", () => {
      const actual = line.toString();
      const expected = "Line : (1,1), (1,1)";
      assert.strictEqual(actual, expected);
    });
  });

  describe("isEqualTo", () => {
    it("should validate two equal lines", () => {
      const similarLine = new Line({ x: 1, y: 1 }, { x: 1, y: 1 });
      assert.ok(line.isEqualTo(similarLine));
    });

    it("should invalidate two unequal lines", () => {
      const otherLine = new Line({ x: 1, y: 1 }, { x: 2, y: 1 });
      assert.notOk(line.isEqualTo(otherLine));
    });

    it("should invalidate the instances of different classes", () => {
      const notALine = { a: { x: 1, y: 1 }, b: { x: 2, y: 1 } };
      assert.notOk(line.isEqualTo(notALine));
    });
  });
});
