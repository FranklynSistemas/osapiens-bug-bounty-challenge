import { getInitials, stringAvatar } from "./avatar";

describe("getInitials", () => {
  it("returns both initials when firstName and lastName are given", () => {
    expect(getInitials({ firstName: "john", lastName: "doe" })).toBe("JD");
  });

  it("handles missing lastName", () => {
    expect(getInitials({ firstName: "alice" })).toBe("A");
  });

  it("handles missing firstName", () => {
    expect(getInitials({ lastName: "brown" })).toBe("B");
  });

  it("returns empty string when no names given", () => {
    expect(getInitials({})).toBe("");
  });

  it("returns empty string when names are empty strings", () => {
    expect(getInitials({ firstName: "", lastName: "" })).toBe("");
  });

  it("handles diacritics with toLocaleUpperCase", () => {
    expect(getInitials({ firstName: "über", lastName: "straße" })).toBe("ÜS");
  });

  it("handles single-character names", () => {
    expect(getInitials({ firstName: "A", lastName: "B" })).toBe("AB");
  });

  it("handles single-character firstName with missing lastName", () => {
    expect(getInitials({ firstName: "Z" })).toBe("Z");
  });
});

describe("stringAvatar", () => {
  it("returns initials and sx with bgcolor", () => {
    const result = stringAvatar({ firstName: "Jane", lastName: "Doe" });
    expect(result.children).toBe("JD");
    expect(result.sx.bgcolor).toMatch(/^rgb\(\d+,\d+,\d+\)$/);
    expect(result.sx.cursor).toBe("pointer");
  });

  it("falls back for missing firstName when computing blue channel", () => {
    const result = stringAvatar({ lastName: "X" });
    expect(result.children).toBe("X");
    expect(result.sx.bgcolor).toMatch(/^rgb\(\d+,\d+,\d+\)$/);
  });

  it("uses default fallback chars when initials are empty", () => {
    const result = stringAvatar({});
    expect(result.children).toBe("");
    expect(result.sx.bgcolor).toBe("rgb(140,147,154)");
  });

  it("falls back for single-char firstName when accessing second char", () => {
    const result = stringAvatar({ firstName: "A", lastName: "Bee" });
    expect(result.children).toBe("AB");
    expect(result.sx.bgcolor).toMatch(/^rgb\(\d+,\d+,\d+\)$/);
  });
});
