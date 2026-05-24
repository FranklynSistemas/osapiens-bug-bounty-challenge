import { makeAutoObservable, runInAction } from "mobx";
import {
  ActionError,
  ActionResultStatus,
  ActionSuccess
} from "../../../types/global";
import { resultOrError, ResultOrErrorResponse } from "../../../utils/global";

export type UserRole = "admin" | "user";

export interface User {
  firstName?: string;
  lastName?: string;
  eMail?: string;
  role?: UserRole;
}

export default class UserStore {
  user: User | null = null;
  private loginRole: UserRole = "admin";

  constructor() {
    makeAutoObservable(this);
  }

  // Helper to simulate a user with denied access
  toggleLoginRole() {
    this.loginRole = this.loginRole === "admin" ? "user" : "admin";
  }

  clearUser() {
    this.user = null;
  }

  async getOwnUser() {
    const [result, error] = (await resultOrError(
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              firstName: "Aria",
              lastName: "Test",
              eMail: "linda.bolt@osapiens.com",
              role: this.loginRole
            }),
          500
        )
      )
    )) as ResultOrErrorResponse<User>;

    if (!!error) {
      return {
        status: ActionResultStatus.ERROR,
        error
      } as ActionError;
    }

    if (result) {
      runInAction(() => {
        this.user = result;
      });

      return {
        status: ActionResultStatus.SUCCESS,
        result: result
      } as ActionSuccess<User>;
    }

    return {
      status: ActionResultStatus.ERROR,
      error: "Something went wrong."
    } as ActionError;
  }
}
