import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useUserStore } from "../api/services/User";
import { ActionResultStatus } from "../types/global";

const hideSplashScreen = () => {
  const splashscreen = document.getElementById("app-splashscreen");
  if (splashscreen) {
    splashscreen.className = "";
    setTimeout(() => splashscreen.remove(), 300);
  }
};

export const useInitialFetch = () => {
  const userStore = useUserStore();
  const { enqueueSnackbar } = useSnackbar();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    userStore
      .getOwnUser()
      .then((response) => {
        if (response.status === ActionResultStatus.ERROR) {
          const message = response.error instanceof Error ? response.error.message : String(response.error);
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .finally(() => {
        setInitialLoading(false);
        hideSplashScreen();
      });
  }, []);

  return { initialLoading };
};
