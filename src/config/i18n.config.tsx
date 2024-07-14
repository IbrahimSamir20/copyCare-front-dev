// config/i18n.config.tsx
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng') ?? 'en',
    supportedLngs: ['en', 'ar'],
    fallbackLng: localStorage.getItem('i18nextLng') ?? 'en',
    debug: true,
    backend: {
      loadPath: '/src/locales/{{lng}}/translation.json',
    },
  });

export default i18n;
