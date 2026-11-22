import en from './en.json';
import fr from './fr.json';

export { en, fr };
export type TranslationKey = keyof typeof en;

export const SUPPORTED_LANGUAGES = ['en', 'fr'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const TRANSLATIONS: Record<SupportedLanguage, Record<TranslationKey, string>> = {
  en,
  fr,
};
