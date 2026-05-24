import { useTranslation } from "react-i18next";
import { TRoute } from "../types/global";

export const usePageTitle = (route: TRoute) => {
  const { t } = useTranslation("app");

  if (route.path.indexOf("data") > -1 || route.path.indexOf("settings") > -1) {
    const [, groupName] = route.path.split("/");
    return t(`routes./${groupName}`);
  }

  return t(`routes.${route.path}`);
};
