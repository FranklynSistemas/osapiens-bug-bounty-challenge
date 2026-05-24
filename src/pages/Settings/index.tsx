import { mdiAccount, mdiTag } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ERoute } from "../../types/global";

const pageConfig: Record<string, { icon: string; ns: string }> = {
  [ERoute.SETTINGS_ACCOUNT]: { icon: mdiAccount, ns: "account" },
  [ERoute.SETTINGS_DETAILS]: { icon: mdiTag, ns: "details" },
};

const Settings = () => {
  const { t } = useTranslation("app");
  const { pathname } = useLocation();
  const config = pageConfig[pathname as keyof typeof pageConfig];

  if (!config) return null;

  return (
    <Box p={4} display="flex" flexDirection="column" alignItems="center">
      <Icon path={config.icon} size={2} />
      <Typography variant="h4" mt={2}>
        {t(`settings.${config.ns}.title`)}
      </Typography>
      <Typography variant="body1" color="textSecondary" mt={1}>
        {t(`settings.${config.ns}.description`)}
      </Typography>
    </Box>
  );
};

export default observer(Settings);
