// src/locales/index.ts
import en from './en/translation.json';
import ar from './ar/translation.json';

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

export type TranslationKeys = keyof typeof en; // Assuming both `en` and `ar` have the same structure
