import UserStore from "./store";

describe("UserStore", () => {
  let store: UserStore;

  beforeEach(() => {
    store = new UserStore();
  });

  it("starts with null user", () => {
    expect(store.user).toBeNull();
  });

  describe("toggleLoginRole", () => {
    it("alternates role returned by subsequent getOwnUser", async () => {
      store.toggleLoginRole();
      await store.getOwnUser(0);
      expect(store.user?.role).toBe("user");

      store.toggleLoginRole();
      await store.getOwnUser(0);
      expect(store.user?.role).toBe("admin");
    });
  });

  describe("clearUser", () => {
    it("sets user to null", () => {
      (store as any).user = { firstName: "test" };
      store.clearUser();
      expect(store.user).toBeNull();
    });
  });

  describe("getOwnUser", () => {
    it("sets user with loginRole after resolving", async () => {
      await store.getOwnUser(0);

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
      const result = await store.getOwnUser(0);

      expect(result).toEqual(
        expect.objectContaining({ status: "SUCCESS" }),
      );
    });
  });
});
