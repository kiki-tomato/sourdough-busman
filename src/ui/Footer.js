import { useTranslation } from "react-i18next";

import styles from "./Footer.module.css";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles.footer}>
      <p>• {t("footer.about")} •</p>
      <a href="mailto:jihyun_bae@icloud.com">{t("footer.contact")}</a>
      <div>© 2024 Bae</div>
    </div>
  );
}

export default Footer;
