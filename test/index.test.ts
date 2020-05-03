// Copyright (c) 2020 Fernando G. Vilar
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import "./global.d";
import { Query } from "query-string-lite";
import renameToAndFrom, { Dictionary, rename } from "../src";

const emptyQuery: Query = {};
const exampleQuery: Query = { a: true, b: ["b"], z: ["z"] };

const emptyDict: Dictionary = {};
const dictA: Dictionary = { a: "A", y: "Y" };

const dicts = [
  ["an empty dictionary", emptyDict],
  ["an example dictionary", dictA],
] as const;

describe("exported `renamer`", () => {
  it("is a function", () => {
    expect(rename).toBeFunction();
  });

  describe.each(dicts)("when called with %s", (_, d) => {
    const tcs = [
      ["an empty query", "an empty query", emptyQuery, emptyQuery],
      [
        "an example query",
        "the example query with the keys properly renamed",
        exampleQuery,
        d === emptyDict ? exampleQuery : { A: true, b: ["b"], z: ["z"] },
      ],
    ] as const;

    describe("only", () => {
      const f = rename(d);
      it("produces a renaming function", () => {
        expect(f).toBeFunction();
      });

      it.each(tcs)(
        "when called to rename %s returns %s",
        (_1, _2, input, expectation) => {
          expect(f(input)).toEqual(expectation);
        },
      );
    });

    it.each(tcs)("and %s it returns %s", (_1, _2, input, expectation) => {
      expect(rename(d, input)).toEqual(expectation);
    });
  });
});

describe("default export", () => {
  it("is a function", () => {
    expect(renameToAndFrom).toBeFunction();
  });

  describe.each(dicts)("when called with %s", (_, d) => {
    const o = renameToAndFrom(d);

    it("produces an object", () => {
      expect(o).toBeObject();
    });

    const { to, from } = o;
    it("containing a `to` and `from` properties, each being a renaming function", () => {
      expect(o).toContainKeys(["to", "from"]);
      expect(to).toBeFunction();
      expect(from).toBeFunction();
    });

    it.each([
      ["an empty query", emptyQuery],
      ["an example query", exampleQuery],
    ])(
      "when called to rename %s and then back, they return the original query",
      (_1, input) => {
        expect(from(to(input))).toEqual(input);
      },
    );
  });
});
