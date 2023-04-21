export const i18n = {
    defaultLocale: 'en',
    locales: [
        "de",
        "es",
        "fr",
        "it",
        "pt",
        "ru",
        "zh",
    ],
} as const

export type Locale = typeof i18n['locales'][number]