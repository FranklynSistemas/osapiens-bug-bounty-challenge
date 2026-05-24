import { Box, CircularProgress, Slide } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useUserStore } from "../../api/services/User";
import AppHeader from "../../components/AppHeader";
import useMatchedRoute from "../../hooks/useMatchedRoute";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActionResultStatus, TRoute } from "../../types/global";
import AccessDenied from "../AccessDenied";
import Login from "../Login";
import { routes as useRoutes } from "../routes";

const hideSplashScreen = () => {
  const splashscreen = document.getElementById("app-splashscreen");

  if (splashscreen) {
    splashscreen.className = "";
    setTimeout(() => {
      splashscreen.remove();
    }, 300);
  }
};

const Root = () => {
  const { t } = useTranslation("app");
  const userStore = useUserStore();
  const { user } = userStore;
  const theme = useTheme();
  const [initialLoading, setInitialLoading] = useState(true);
  const [asyncError, setAsyncError] = useState<Error | null>(null);
  const routes = [...useRoutes] as readonly TRoute[];
  const [fallbackRoute] = routes;
  const Fallback = fallbackRoute.Component;
  const { route = fallbackRoute, MatchedElement } = useMatchedRoute(
    routes,
    Fallback,
    { matchOnSubPath: true },
  );

  let pageTitle = t(`routes.${route.path}`);

  if (route.path.indexOf("data") > -1 || route.path.indexOf("settings") > -1) {
    const [, groupName] = route.path.split("/");
    pageTitle = t(`routes./${groupName}`);
  }

  const handleFetchError = (
    response: { status: ActionResultStatus; error?: unknown },
    context: string,
  ) => {
    if (response.status === ActionResultStatus.ERROR) {
      console.error(`${context} failed:`, response.error);
      setAsyncError(
        response.error instanceof Error
          ? response.error
          : new Error(String(response.error)),
      );
    }
  };

  useEffect(() => {
    userStore
      .getOwnUser()
      .then((response) => handleFetchError(response, "Initial fetch"))
      .finally(() => {
        setInitialLoading(false);
        hideSplashScreen();
      });
  }, []);

  const onLogin = async () => {
    userStore.toggleLoginRole();
    handleFetchError(await userStore.getOwnUser(), "Login");
  };

  if (asyncError) throw asyncError;

  const onLogout = () => {
    userStore.clearUser();
  };

  if (initialLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100vw"
        height="100vh"
      >
        <CircularProgress color="primary" size={100} />
      </Box>
    );
  }

  if (!user) {
    return <Login onLogin={onLogin} />;
  }

  if (user.role !== "admin") {
    return <AccessDenied onLogout={onLogout} />;
  }

  return (
    <div
      id="portal-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "#f5f5f5",
        }}
      >
        <Slide direction="down" in mountOnEnter>
          <AppHeader
            user={user ?? {}}
            pageTitle={pageTitle}
            onLogout={onLogout}
          />
        </Slide>
        <Box
          component="main"
          sx={{
            position: "relative",
            height: `calc(100% - ${theme.tokens.header.height})`,
            width: "100%",
            marginTop:
              theme.tokens.header.height /* Necessary because of AppBar */,
          }}
        >
          {MatchedElement}
        </Box>
      </Box>
    </div>
  );
};

export default observer(Root);
