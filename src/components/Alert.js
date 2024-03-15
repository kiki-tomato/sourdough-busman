import { useTranslation } from "react-i18next";
import noResult from "../assets/Search.svg";

function Alert() {
  const { t } = useTranslation();

  return (
    <>
      <img src={noResult} className="alert-img" alt="No Result" />
      <p className="alert-message">{t("alert.noResults")}</p>
    </>
  );
}

export default Alert;
