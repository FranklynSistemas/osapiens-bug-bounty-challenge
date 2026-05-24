import UserStore from "./store";

describe("UserStore", () => {
  it("starts with null user", () => {
    const store = new UserStore();
    expect(store.user).toBeNull();
  });

  describe("toggleLoginRole", () => {
    it("alters role returned by subsequent getOwnUser", async () => {
      jest.useFakeTimers();
      const store = new UserStore();

      store.toggleLoginRole();
      const promise = store.getOwnUser();
      jest.advanceTimersByTime(500);
      await promise;

      expect(store.user?.role).toBe("user");

      store.toggleLoginRole();
      const promise2 = store.getOwnUser();
      jest.advanceTimersByTime(500);
      await promise2;

      expect(store.user?.role).toBe("admin");
      jest.useRealTimers();
    });
  });

  describe("clearUser", () => {
    it("sets user to null", () => {
      const store = new UserStore();
      (store as any).user = { firstName: "test" };
      store.clearUser();
      expect(store.user).toBeNull();
    });
  });

  describe("getOwnUser", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("sets user with loginRole after resolving", async () => {
      const store = new UserStore();
      const promise = store.getOwnUser();

      jest.advanceTimersByTime(500);
      await promise;

      expect(store.user).toEqual(
        expect.objectContaining({
          firstName: "Aria",
          lastName: "Test",
          eMail: "linda.bolt@osapiens.com",
          role: "admin",
        }),
      );
    });

    it("returns SUCCESS status on resolve", async () => {
      const store = new UserStore();
      const promise = store.getOwnUser();

      jest.advanceTimersByTime(500);
      const result = await promise;

      expect(result).toEqual(
        expect.objectContaining({ status: "SUCCESS" }),
      );
    });
  });
});
