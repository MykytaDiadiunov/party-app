import {createI18n, useI18n} from 'vue-i18n'
import en from '@/i18n/locales/en.json'
import { useLangStore } from '@/stores/lang-store'

export type Lang = 'en' 

export interface LangInfo {
   lang: Lang
   name: string
   native: string
   localizeKey: string
}

const defaultLang: Lang = 'en'

const i18n = createI18n({
   legacy: false,
   locale: defaultLang,
   messages: { en }
})

export const useAppI18n = () => {
    const langStore = useLangStore()
    const {locale, t: translate} = useI18n({useScope: 'global'})
    const languages: Readonly<Lang[]> = ['en']

    function changeLang(lang: Lang): void {
        if (!languages.includes(lang)) {
            lang = defaultLang
        }
        locale.value =  lang
        langStore.setLang(lang)
        document.documentElement.setAttribute('lang', lang)
    }

    function getCurrentLang(): Lang {
        const storeLang: Lang = langStore.getLang() as Lang

        if (languages.includes(storeLang)) {
            return storeLang
        }

        for (const lang of navigator.languages) {
            const browserLang: Lang | null = languages.find((el: string) => lang.includes(el)) || null
   
            if (browserLang) {
               return browserLang
            }
        }

        return defaultLang
    }

    function getLangsInfo(): LangInfo[] {
        return [
            {lang: 'en', name: 'English', native: 'English', localizeKey: 'LANGUAGES.ENGLISH'},
        ]
    }

    function getLangInfo(lang: Lang): LangInfo | null {
        return getLangsInfo().find((el: LangInfo) => el.lang === lang) || null
     }
  
    async function init(): Promise<void> {
        try {
            const currentLang: Lang = getCurrentLang()
            changeLang(currentLang)
        } catch (e) {
            console.error(e)
        }
    }

    return {
        i18n,
        locale,
        defaultLang,
        languages,
        translate,
        changeLang,
        getCurrentLang,
        getLangsInfo,
        init,
        getLangInfo
    }
}

export default i18n