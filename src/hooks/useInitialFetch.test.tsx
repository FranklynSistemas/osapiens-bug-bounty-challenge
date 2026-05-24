import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { SnackbarProvider } from "notistack";
import { useInitialFetch } from "./useInitialFetch";
import { ActionResultStatus } from "../types/global";

const mockGetOwnUser = jest.fn();

jest.mock("../api/services/User", () => ({
  useUserStore: () => ({
    getOwnUser: mockGetOwnUser,
  }),
}));

const TestComponent = () => {
  const { initialLoading } = useInitialFetch();
  return <span data-testid="status">{initialLoading ? "loading" : "loaded"}</span>;
};

const renderHelper = (ui: React.ReactElement) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  act(() => { ReactDOM.render(ui, container); });
  const getText = () =>
    (container.querySelector("[data-testid=status]")?.textContent ?? "").trim();
  return {
    text: getText,
    unmount: () => {
      act(() => { ReactDOM.unmountComponentAtNode(container); });
      container.remove();
    },
  };
};

describe("useInitialFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading then loaded on success", async () => {
    mockGetOwnUser.mockResolvedValue({
      status: ActionResultStatus.SUCCESS,
      result: { firstName: "Aria" },
    });

    const { text, unmount } = renderHelper(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    expect(text()).toBe("loading");

    await act(() => Promise.resolve());

    expect(text()).toBe("loaded");

    unmount();
  });

  it("shows loading then loaded even on error", async () => {
    mockGetOwnUser.mockResolvedValue({
      status: ActionResultStatus.ERROR,
      error: new Error("Network error"),
    });

    const { text, unmount } = renderHelper(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    expect(text()).toBe("loading");

    await act(() => Promise.resolve());

    expect(text()).toBe("loaded");

    unmount();
  });
});
