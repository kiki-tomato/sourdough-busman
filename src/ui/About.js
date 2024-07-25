import { useTranslation } from "react-i18next";

function About({ children }) {
  const { t } = useTranslation();

  return (
    <div className="short-info">
      <div>✸ {t("buttons.shortInfo")}</div>
      <div className="extra-info">{children}</div>
    </div>
  );
}

export default About;
