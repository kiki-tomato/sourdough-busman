import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <p>• {t("footer.about")} •</p>
      <a href="mailto:jihyun_bae@icloud.com">{t("footer.contact")}</a>
      <div>© 2024 Bae</div>
    </div>
  );
}

export default Footer;
