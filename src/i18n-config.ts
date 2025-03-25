export const i18n = {
  locales: ['en', 'ar'],
  defaultLocale: 'en',
};

export type Locale = (typeof i18n)["locales"][number];
