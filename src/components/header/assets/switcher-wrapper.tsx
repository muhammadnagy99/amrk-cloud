import { EnLangSwitcher, ArLangSwitcher } from "./icons";
import LanguageSwitcher from "./language-switcher";

const LANGUAGE_OPTIONS = {
    en: {
        url: '/en',
        source: <EnLangSwitcher />,
        label: 'English',
        ariaLabel: 'Switch to English'
    },
    ar: {
        url: '/ar',
        source: <ArLangSwitcher />,
        label: 'العربية',
        ariaLabel: 'التغيير إلى العربية'
    }
};

export default function LangWrapper({ lang }: { lang: string}) {
    const oppositeLang = lang === 'en' ? 'ar' : 'en';
    const switchOption = LANGUAGE_OPTIONS[oppositeLang];

    return (
        <p className="w-11 h-10 flex justify-center items-center bg-white rounded-lg border-widget">
            <LanguageSwitcher
                icon={{
                    url: switchOption.url,
                    source: switchOption.source
                }}
                ariaLabel={switchOption.ariaLabel}
            />
        </p>
    )
}