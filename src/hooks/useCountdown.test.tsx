import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { useCountdown } from "./useCountdown";

const TestComponent = () => {
  const { minutes, seconds, expired } = useCountdown();
  return <>{minutes}:{seconds} - {expired ? "expired" : "active"}</>;
};

const renderHelper = (ui: React.ReactElement) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  act(() => { ReactDOM.render(ui, container); });
  return {
    text: () => container.textContent ?? "",
    unmount: () => {
      act(() => { ReactDOM.unmountComponentAtNode(container); });
      container.remove();
    },
  };
};

describe("useCountdown", () => {
  beforeEach(() => { jest.useFakeTimers(); });
  afterEach(() => { jest.useRealTimers(); });

  it("starts at 60:00 and not expired", () => {
    const { text } = renderHelper(<TestComponent />);
    expect(text()).toBe("60:00 - active");
  });

  it("ticks down each second", () => {
    const { text } = renderHelper(<TestComponent />);
    act(() => { jest.advanceTimersByTime(1000); });
    expect(text()).toBe("59:59 - active");
  });

  it("stops and expires at 00:00, interval does not continue", () => {
    const { text } = renderHelper(<TestComponent />);
    act(() => { jest.advanceTimersByTime(3600000); });
    expect(text()).toBe("00:00 - expired");

    act(() => { jest.advanceTimersByTime(5000); });
    expect(text()).toBe("00:00 - expired");
  });

  it("cleans up interval on unmount", () => {
    const { unmount } = renderHelper(<TestComponent />);
    const spy = jest.spyOn(global, "clearInterval");
    unmount();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
