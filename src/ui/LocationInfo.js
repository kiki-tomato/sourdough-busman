import { useTranslation } from "react-i18next";

function LocationInfo({ children }) {
  const { t } = useTranslation();

  return (
    <div className="location-info">
      <div>✸ {t("info.location")}</div>
      {children}
    </div>
  );
}

export default LocationInfo;
