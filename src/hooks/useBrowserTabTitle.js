import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useBrowserTabTitle() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("header.title");
  }, [t]);
}
