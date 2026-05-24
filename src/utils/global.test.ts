import { resultOrError } from "./global";

describe("resultOrError", () => {
  it("returns [result, null] on success", async () => {
    const [result, error] = await resultOrError(Promise.resolve(42));
    expect(result).toBe(42);
    expect(error).toBeNull();
  });

  it("returns [null, error] on rejection", async () => {
    const testError = new Error("fail");
    const [result, error] = await resultOrError(Promise.reject(testError));
    expect(result).toBeNull();
    expect(error).toBe(testError);
  });

  it("preserves falsy values as successful results", async () => {
    const [result, error] = await resultOrError(Promise.resolve(0));
    expect(result).toBe(0);
    expect(error).toBeNull();
  });

  it("returns non-Error rejection values as the error", async () => {
    const [result, error] = await resultOrError(Promise.reject("string error"));
    expect(result).toBeNull();
    expect(error).toBe("string error");
  });
});
