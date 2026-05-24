import { mdiAlert } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { ERoute } from "../../types/global";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flex: 4,
  justifyContent: "space-evenly",
  flexDirection: "column",
  alignItems: "center",
  overflowY: "scroll",
  background: `url(${""}) repeat content-box`
}));

interface AccessDeniedProps {
  onLogout: () => void;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ onLogout }) => {
  const { t } = useTranslation("app");
  const theme = useTheme();
  const history = useHistory();

  const color = theme.palette.error.main;
  React.useEffect(() => {
    // on screen leave
    return () => {
      // clearCache()
    };
    // eslint-disable-next-line
  }, []);
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Container>
        <Icon size={2} color={color} path={mdiAlert} />
        <Typography variant="h5" sx={{ color }}>
          {t("accessDenied.title")}
        </Typography>
        <Typography>{t("accessDenied.message")}</Typography>
        <Button sx={{ color }} onClick={() => { onLogout(); history.push(ERoute.LOGIN); }}>
          {t("logout")}
        </Button>
      </Container>
      <Box sx={{ flex: 3 }}></Box>
    </Box>
  );
};

export default AccessDenied;
