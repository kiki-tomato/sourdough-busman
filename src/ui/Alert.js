import { useTranslation } from "react-i18next";

import noResult from "../assets/Search.svg";

function Alert() {
  const { t } = useTranslation();

  return (
    <div className="alert">
      <img src={noResult} className="alert-img" alt="No result" />
      <p className="alert-message">{t("alert.noResults")}</p>
    </div>
  );
}

export default Alert;
