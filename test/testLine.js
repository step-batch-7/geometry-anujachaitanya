const Line = require("../src/line");
const Point = require("../src/point");
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

    it("should validate if start of one line is equal to end of other and vice versa", () => {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 1 });
      const similarLine = new Line({ x: 1, y: 1 }, { x: 1, y: 2 });
      assert.ok(line.isEqualTo(similarLine));
    });
  });

  describe("length", () => {
    it("should return length of line with both points have positive co-ordinates", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 1, y: 2 });
      assert.strictEqual(line.length, 1);
    });

    it("should return length of line with points have both positive and negative co-ordinates", () => {
      const line = new Line({ x: -1, y: 1 }, { x: -1, y: 2 });
      assert.strictEqual(line.length, 1);
    });

    it("should return length of line with both points have negative co-ordinates", () => {
      const line = new Line({ x: -1, y: -1 }, { x: -1, y: -2 });
      assert.strictEqual(line.length, 1);
    });

    it("should return 0 if both the points are equal", () => {
      const line = new Line({ x: -1, y: -2 }, { x: -1, y: -2 });
      assert.strictEqual(line.length, 0);
    });
  });

  describe("isParallelTo", () => {
    it("should validate given parallel lines with different length", () => {
      const firstLine = new Line({ x: 1, y: 1 }, { x: 2, y: 1 });
      const secondLine = new Line({ x: 1, y: 2 }, { x: 3, y: 2 });
      assert.ok(firstLine.isParallelTo(secondLine));
    });

    it("should invalidate non - parallel lines", () => {
      const firstLine = new Line({ x: 0, y: 0 }, { x: 0, y: 5 });
      const secondLine = new Line({ x: 0, y: 2 }, { x: 0, y: 2 });
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

    it("should invalidate if given two segments lie on same line", () => {
      const firstLine = new Line({ x: 0, y: 1 }, { x: 0, y: 1.5 });
      const secondLine = new Line({ x: 0, y: 2 }, { x: 0, y: 3 });
      assert.notOk(firstLine.isParallelTo(secondLine));
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
    it("should return y , if the x is present on line", function() {
      const line = new Line({ x: -1, y: 3 }, { x: 3, y: -1 });
      assert.strictEqual(line.findY(1), 1);
    });

    it("should give NaN if given x is not present on line", function() {
      const line = new Line({ x: -1, y: 3 }, { x: 3, y: -1 });
      assert.isNaN(line.findY(4));
    });

    it("should return y if both x co-ordinate are equal", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 0, y: 8 });
      const actual = line.findY(0);
      assert.strictEqual(actual, 0);
    });
  });

  describe("findX", () => {
    it("should return Nan if given y is not present on the line", () => {
      const line = new Line({ x: 4, y: -2 }, { x: 5, y: -4 });
      assert.isNaN(line.findX(6));
    });

    it("should give X for given y is present on line", function() {
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
        new Line({ x: 1, y: 1 }, { x: 1, y: 1.5 }),
        new Line({ x: 1, y: 1.5 }, { x: 1, y: 2 })
      ];

      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("hasPoint", function() {
    it("should validate if point exist on the line", function() {
      const line = new Line({ x: 1, y: 1 }, { x: 8, y: 8 });
      const actual = line.hasPoint(new Point(4, 4));
      assert.isOk(actual);
    });

    it("should invalidate if point doesn't exist on line", function() {
      const line = new Line({ x: 1, y: 1 }, { x: 8, y: 8 });
      const actual = line.hasPoint(new Point(4, 2));
      assert.isNotOk(actual);
    });

    it("should validate if given point is end point of line", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 8, y: 8 });
      const actual = line.hasPoint(new Point(8, 8));
      assert.isOk(actual);
    });

    it("should invalidate if the given object is not a point object", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 8, y: 8 });
      const actual = line.hasPoint({ x: 1, y: 1 });
      assert.isNotOk(actual);
    });
  });

  describe("findDistanceFromStart", () => {
    it("should return point from given distance", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 1, y: 8 });
      assert.deepStrictEqual(line.findPointFromStart(2), { x: 1, y: 3 });
    });

    it("should return undefined if distance is not a number", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 1, y: 8 });
      assert.isUndefined(line.findPointFromStart("a"));
    });

    it("should return point if line have floating co-ordinates", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 1, y: 3.8 });
      assert.deepStrictEqual(line.findPointFromStart(2), { x: 1, y: 3 });
    });

    it("should return null if given distance is greater than line length", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 1, y: 3.8 });
      assert.isNull(line.findPointFromStart(8));
    });

    it("should return null if given distance is less zero", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 1, y: 3.8 });
      assert.isNull(line.findPointFromStart(-1));
    });
  });

  describe("findPointFromEnd", () => {
    it("should return point from given distance", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 1, y: 8 });
      assert.deepStrictEqual(line.findPointFromEnd(2), { x: 1, y: 6 });
    });

    it("should return point if line have floating values", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 1, y: 3.8 });
      const point = new Point(1, 1.7999999999999998);
      assert.deepStrictEqual(line.findPointFromEnd(2), point);
    });

    it("should return undefined if distance is not a number", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 1, y: 3.8 });
      const point = new Point(1, 1.7999999999999998);
      assert.isUndefined(line.findPointFromEnd("a"));
    });
  });
});
