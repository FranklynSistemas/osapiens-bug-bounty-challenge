import { validateParams, buildUrl } from "./router";

describe("validateParams", () => {
  it("returns true when all required params are present", () => {
    expect(validateParams("/user/:id", { id: "42" })).toBe(true);
  });

  it("returns true with extra params that are not in path", () => {
    expect(validateParams("/user/:id", { id: "42", extra: "x" })).toBe(true);
  });

  it("returns false when a required param is missing", () => {
    expect(validateParams("/user/:id", {})).toBe(false);
  });

  it("returns false when params is null", () => {
    expect(validateParams("/user/:id", null)).toBe(false);
  });

  it("returns false when params is a string", () => {
    expect(validateParams("/user/:id", "bad" as unknown as any)).toBe(false);
  });

  it("handles multiple params", () => {
    expect(validateParams("/:a/:b/:c", { a: "1", b: "2", c: "3" })).toBe(true);
  });

  it("returns false when one of multiple params is missing", () => {
    expect(validateParams("/:a/:b/:c", { a: "1", c: "3" })).toBe(false);
  });

  it("handles path with no params", () => {
    expect(validateParams("/static", {})).toBe(true);
  });

  it("returns false when params is an array (instanceof Object but not a valid params map)", () => {
    expect(validateParams("/user/:id", [] as unknown as any)).toBe(false);
  });
});

describe("buildUrl", () => {
  it("replaces single param", () => {
    expect(buildUrl("/user/:id", { id: "42" })).toBe("/user/42");
  });

  it("replaces multiple params", () => {
    expect(buildUrl("/:a/:b", { a: "x", b: "y" })).toBe("/x/y");
  });

  it("ignores params not present in path", () => {
    expect(buildUrl("/static", { extra: "ignored" })).toBe("/static");
  });

  it("returns path unchanged when no params", () => {
    expect(buildUrl("/home", {})).toBe("/home");
  });

  it("only replaces the first occurrence of a duplicate param", () => {
    expect(buildUrl("/:id/:id", { id: "42" })).toBe("/42/:id");
  });

  it("replaces params with regex-special $ values correctly", () => {
    expect(buildUrl("/search/:q", { q: "$&" })).toBe("/search/$&");
  });
});
