import { useTranslation } from "react-i18next";
import WeeklyHours from "./WeeklyHours";

function About({ children }) {
  const { t } = useTranslation();

  return (
    <div className="short-info">
      <div>✸ {t("info.shortInfo")}</div>
      <div className="extra-info">{children}</div>
      <WeeklyHours />
    </div>
  );
}

export default About;
