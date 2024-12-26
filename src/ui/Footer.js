import { useTranslation } from "react-i18next";

import styles from "./Footer.module.scss";

function Footer() {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();
  const copyrightYear = currentYear > 2024 ? `2024 - ${currentYear}` : 2024;

  return (
    <footer className={styles.footer}>
      <p>• {t("footer.about")} •</p>
      <a className={styles.contact} href="mailto:jihyun_bae@icloud.com">
        {t("footer.contact")}
      </a>
      <div>&copy;{copyrightYear} Jihyun Bae</div>
    </footer>
  );
}

export default Footer;
