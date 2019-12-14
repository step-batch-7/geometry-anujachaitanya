const assert = require("chai").assert;
const { Point } = require("../src/point");

describe("Point", () => {
  describe("toString", () => {
    it("should return a string representation of given point", () => {
      const point = new Point(2, 3);
      assert.strictEqual(point.toString(), "[Point @(2,3)]");
    });
  });

  describe("clone", () => {
    it("should return copy of given point", () => {
      const point = new Point(2, 3);
      assert.deepStrictEqual(point.clone(), { x: 2, y: 3 });
    });

    describe("visit", () => {
      it("should return given operation", () => {
        const point = new Point(2, 3);
        assert.strictEqual(
          point.visit((x, y) => x + y),
          5
        );
      });

      it("should perform operation on single element", () => {
        const point = new Point(2, 3);
        assert.strictEqual(
          point.visit(x => x),
          2
        );
      });
    });

    describe("isEqualTo", () => {
      it("should validate two same points", () => {
        const point = new Point(2, 3);
        const otherPoint = new Point(2, 3);
        assert.ok(point.isEqualTo(otherPoint));
      });

      it("should invalidate points with different co-ordinates", () => {
        const point = new Point(2, 3);
        const otherPoint = new Point(2, 4);
        assert.notOk(point.isEqualTo(otherPoint));
      });

      it("should validate two same instances", () => {
        const point = new Point(2, 3);
        assert.ok(point.isEqualTo(point));
      });

      it("should invalidate instances from different classes", () => {
        const point = new Point(2, 3);
        assert.notOk(point.isEqualTo({ x: 2, y: 3 }));
      });
    });
  });
});
