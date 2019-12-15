const { Line } = require("../src/line");
const assert = require("chai").assert;

describe("Line", () => {
  const line = new Line({ x: 1, y: 1 }, { x: 1, y: 1 });
  describe("toString", () => {
    it("should return string representation of given line", () => {
      const actual = line.toString();
      const expected = "[Line (1,1) to (1,1)]";
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
    it("should validate if line a and line b have same end points", () => {
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
      const firstLine = new Line({ x: 1, y: 0 }, { x: 2, y: 0 });
      const secondLine = new Line({ x: 3, y: 3 }, { x: 4, y: 3 });
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

    it("should invalidate overlapping lines", () => {
      const firstLine = new Line({ x: 1, y: 1 }, { x: 2, y: 1.5 });
      const secondLine = new Line({ x: 1, y: 1 }, { x: 2, y: 1.5 });
      assert.notOk(firstLine.isParallelTo(secondLine));
    });

    it("should invalidate if given parameter is not Line", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 1, y: 0 });
      assert.notOk(line.isParallelTo({ x: 2, y: 2 }, { x: 3, y: 2 }));
    });

    it("should invalidate line itself is passed", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 1, y: 0 });
      assert.notOk(line.isParallelTo(line));
    });
  });

  describe("slope", () => {
    it("should return slope of given line when slope is positive", () => {
      const line = new Line({ x: 4, y: 3 }, { x: 1, y: 2 });
      assert.approximately(line.slope, 0.33, 0.01);
    });

    it("should return slope of given line if slope is negative", () => {
      const line = new Line({ x: 0, y: 3 }, { x: 1, y: 1 });
      assert.strictEqual(line.slope, -2);
    });

    it("should return infinite of y- axis", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 0, y: 2 });
      assert.strictEqual(line.slope, Infinity);
    });

    it("should return 0 of x- axis", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 1, y: 0 });
      assert.strictEqual(line.slope, 0);
    });
  });

  describe("findY", () => {
    it("should give Y for given x when edge point is given", function() {
      const line = new Line({ x: 0, y: 6 }, { x: 3, y: 8 });
      const actual = line.findY(3);
      assert.strictEqual(actual, 8);
    });

    it("should return y , if the x is present on line", function() {
      const line = new Line({ x: -1, y: 3 }, { x: 3, y: -1 });
      assert.strictEqual(line.findY(1), 1);
    });

    it("should give NaN if given x is not present on line", function() {
      const line = new Line({ x: -1, y: 3 }, { x: 3, y: -1 });
      assert.isNaN(line.findY(4));
    });

    it("should return x when slope is zero", function() {
      const line = new Line({ x: 0, y: 0 }, { x: 8, y: 0 });
      const actual = line.findX(0);
      assert.strictEqual(actual, 0);
    });
  });

  describe("findX", () => {
    it("should return Nan if given y is not present on the line", () => {
      const line = new Line({ x: 4, y: -2 }, { x: 5, y: -4 });
      assert.isNaN(line.findX(6));
    });

    it("should give X for given y when edge point is given", function() {
      const line = new Line({ x: 6, y: 0 }, { x: 8, y: 3 });
      const actual = line.findX(3);
      assert.strictEqual(actual, 8);
    });

    it("should return x when slope is zero", function() {
      const line = new Line({ x: 0, y: 0 }, { x: 8, y: 0 });
      const actual = line.findX(0);
      assert.strictEqual(actual, 0);
    });
  });

  describe("split", () => {
    it("should return 2 lines split exactly at the centre of line a", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 1, y: 2 });
      const actual = line.split();
      const expected = [
        { a: { x: 1, y: 1 }, b: { x: 1, y: 1.5 } },
        { a: { x: 1, y: 1.5 }, b: { x: 1, y: 2 } }
      ];

      assert.deepStrictEqual(actual, expected);
    });
  });
});
