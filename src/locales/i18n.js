import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";
import translationKR from "./kr/translation";
import translateionEN from "./en/translation";

const resources = {
  en: { translation: translateionEN },
  kr: { translation: translationKR },
};

i18n.use(languageDetector).init({
  resources,
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
