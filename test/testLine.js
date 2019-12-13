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

    it("should validate the instances of same class", () => {
      const similarLine = new Line({ x: 1, y: 1 }, { x: 1, y: 1 });
      assert.ok(line.isEqualTo(similarLine));
    });
  });

  describe("length", () => {
    it("should return length of line with both points in Ist quadrant", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 1, y: 2 });
      assert.strictEqual(line.length, 1);
    });

    it("should return length of line with both points in IIst quadrant", () => {
      const line = new Line({ x: -1, y: 1 }, { x: -1, y: 2 });
      assert.strictEqual(line.length, 1);
    });

    it("should return length of line with both points in IIIst quadrant", () => {
      const line = new Line({ x: -1, y: -1 }, { x: -1, y: -2 });
      assert.strictEqual(line.length, 1);
    });

    it("should return length of line with both points in IVst quadrant", () => {
      const line = new Line({ x: 1, y: -1 }, { x: 1, y: -2 });
      assert.strictEqual(line.length, 1);
    });

    it("should return length of line in two different co-ordinates", () => {
      const line = new Line({ x: -2, y: 8 }, { x: -7, y: -5 });
      assert.approximately(line.length, 13.93, 0.01);
    });
  });

  describe("isParallelTo", () => {
    it("should validate given parallel lines with same length", () => {
      const firstLine = new Line({ x: 1, y: 1 }, { x: 2, y: 1 });
      const secondLine = new Line({ x: 1, y: 2 }, { x: 2, y: 2 });
      assert.ok(firstLine.isParallelTo(secondLine));
    });

    it("should validate given parallel lines with different length", () => {
      const firstLine = new Line({ x: 1, y: 1 }, { x: 2, y: 1 });
      const secondLine = new Line({ x: 1, y: 2 }, { x: 3, y: 2 });
      assert.ok(firstLine.isParallelTo(secondLine));
    });

    it("should invalidate non - parallel lines", () => {
      const firstLine = new Line({ x: 1, y: 1 }, { x: 2, y: 1.5 });
      const secondLine = new Line({ x: 1, y: 2 }, { x: 3, y: 2 });
      assert.notOk(firstLine.isParallelTo(secondLine));
    });
  });

  describe("slope", () => {
    it("should return slope of given line", () => {
      const line = new Line({ x: 4, y: 3 }, { x: 1, y: 2 });
      assert.approximately(line.slope, 0.33, 0.01);
    });

    it("should return 0 of x- axis", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 1, y: 0 });
      assert.strictEqual(line.slope, 0);
    });
  });
});
