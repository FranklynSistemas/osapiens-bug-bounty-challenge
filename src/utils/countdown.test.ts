import { formatCountdown } from "./countdown";

describe("formatCountdown", () => {
  it("returns total duration when nothing has elapsed", () => {
    expect(formatCountdown(0, 3600)).toEqual({
      minutes: "60",
      seconds: "00",
      expired: false,
    });
  });

  it("formats one minute elapsed", () => {
    expect(formatCountdown(60, 3600)).toEqual({
      minutes: "59",
      seconds: "00",
      expired: false,
    });
  });

  it("expires when elapsed equals total", () => {
    expect(formatCountdown(3600, 3600)).toEqual({
      minutes: "00",
      seconds: "00",
      expired: true,
    });
  });

  it("clamps to 00:00 when elapsed exceeds total", () => {
    expect(formatCountdown(4000, 3600)).toEqual({
      minutes: "00",
      seconds: "00",
      expired: true,
    });
  });
});
