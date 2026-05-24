import { Box, CircularProgress, Slide } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useUserStore } from "../../api/services/User";
import AppHeader from "../../components/AppHeader";
import useMatchedRoute from "../../hooks/useMatchedRoute";
import { useInitialFetch } from "../../hooks/useInitialFetch";
import { usePageTitle } from "../../hooks/usePageTitle";
import { observer } from "mobx-react";
import { ActionResultStatus, TRoute } from "../../types/global";
import AccessDenied from "../AccessDenied";
import Login from "../Login";
import { routes as useRoutes } from "../routes";

const Root = () => {
  const userStore = useUserStore();
  const { user } = userStore;
  const { initialLoading } = useInitialFetch();
  const theme = useTheme();
  const routes = [...useRoutes] as readonly TRoute[];
  const [fallbackRoute] = routes;
  const Fallback = fallbackRoute.Component;
  const { route = fallbackRoute, MatchedElement } = useMatchedRoute(
    routes,
    Fallback,
    { matchOnSubPath: true },
  );
  const pageTitle = usePageTitle(route);

  const onLogin = async () => {
    userStore.toggleLoginRole();
    const response = await userStore.getOwnUser();
    if (response.status === ActionResultStatus.ERROR) {
      throw response.error instanceof Error
        ? response.error
        : new Error(String(response.error));
    }
  };

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
