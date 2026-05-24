import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { usePageTitle } from "./usePageTitle";
import { ERoute, TRoute } from "../types/global";
import "../i18n";

const TestComponent = ({ route }: { route: TRoute }) => {
  const title = usePageTitle(route);
  return <>{title}</>;
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

describe("usePageTitle", () => {
  it("returns translated title for /home", () => {
    const route: TRoute = { path: ERoute.HOME, Component: () => null };
    const { text, unmount } = renderHelper(<TestComponent route={route} />);
    expect(text()).toBe("Bug Bounty Challenge");
    unmount();
  });

  it("uses group title for /settings/account", () => {
    const route: TRoute = { path: ERoute.SETTINGS_ACCOUNT, Component: () => null };
    const { text, unmount } = renderHelper(<TestComponent route={route} />);
    expect(text()).toBe("Settings");
    unmount();
  });

  it("uses group title for /settings/details", () => {
    const route: TRoute = { path: ERoute.SETTINGS_DETAILS, Component: () => null };
    const { text, unmount } = renderHelper(<TestComponent route={route} />);
    expect(text()).toBe("Settings");
    unmount();
  });
});
