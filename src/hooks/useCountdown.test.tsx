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
  it("starts at 60:00 and not expired", () => {
    const { text, unmount } = renderHelper(<TestComponent />);
    expect(text()).toBe("60:00 - active");
    unmount();
  });
});
