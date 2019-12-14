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
  });
});
