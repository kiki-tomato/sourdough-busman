import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationKO from "./kr/translation";
import translateionEN from "./en/translation";

const resources = {
  en: { translation: translateionEN },
  ko: { translation: translationKO },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
