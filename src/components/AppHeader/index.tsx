import { Grow, Box, Theme, Toolbar, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { User } from "../../api/services/User/store";
import { ERoute } from "../../types/global";
import { useCountdown } from "../../hooks/useCountdown";
import AvatarMenu from "../AvatarMenu";
import LanguageSelect from "../LanguageSelect";

interface AppBarProps extends MuiAppBarProps {
  theme?: Theme;
}

interface AppHeaderProps {
  user: User;
  pageTitle: string;
  onLogout: () => void;
}

const typoStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  lineHeight: 1
};

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  height: theme.tokens.header.height
}));

const AppHeader = React.forwardRef((props: AppHeaderProps, ref) => {
  const { user, pageTitle, onLogout } = props;
  const { t } = useTranslation("app");
  const history = useHistory();
  const theme = useTheme();

  const { minutes, seconds } = useCountdown();

  return (
    <AppBar ref={ref} position="fixed" sx={{ width: "100vw" }}>
      <Toolbar sx={{ background: "#08140C 0% 0% no-repeat padding-box" }}>
        <Box sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
          <Box>
            <Typography variant="h6" component="div" color="primary">
              {minutes}:{seconds}
            </Typography>
          </Box>
          <Box sx={{ width: 20, height: 20, flex: 1 }} />
          <Box sx={{ flex: 2 }}>
            <Typography
              sx={{
                ...typoStyle,
                color: theme.palette.primary.main,
                mb: theme.spacing(0.5),
                cursor: "pointer"
              }}
              variant="h6"
              component="div"
              onClick={() => history.push(ERoute.HOME)}
            >
              {t("appTitle").toLocaleUpperCase()}
            </Typography>
            <Typography
              sx={{ ...typoStyle }}
              variant="overline"
              component="div"
              noWrap
            >
              {pageTitle.toLocaleUpperCase()}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, justifyContent: "flex-end", display: "flex", alignItems: "center" }}>
            <LanguageSelect />
            <Grow in={Boolean(user && user.eMail)} unmountOnExit>
              <Box display="flex">
                <AvatarMenu user={user} onLogout={onLogout} />
              </Box>
            </Grow>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default AppHeader;
