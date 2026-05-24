import { mdiLogin } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface LoginProps {
  onLogin: () => Promise<void> | void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { t } = useTranslation("app");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    await onLogin();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Icon path={mdiLogin} size={2} />
      <Typography variant="h4" mt={2}>
        {t("login.title")}
      </Typography>
      <Typography variant="body1" color="textSecondary" mt={1} mb={3}>
        {t("login.message")}
      </Typography>
      <Button variant="contained" disabled={loading} onClick={handleLogin}>
        {loading ? <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" /> : null}
        {t("login.button")}
      </Button>
    </Box>
  );
};

export default Login;
