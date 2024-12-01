import { defineStore } from "pinia";
import { ref } from "vue";
import { LANG_STORE_KEY } from "@/constants";

export const useLangStore = defineStore('langStore', () => {

    
    const lang = ref<string | null>(null)

    function setLang(newLang: string): void {
        localStorage.setItem(LANG_STORE_KEY, newLang)
        lang.value = newLang
    }

    function getLang(): string | null {
        lang.value = localStorage.getItem(LANG_STORE_KEY)
        return lang.value
    }

    function removeLang(): void {
        localStorage.removeItem(LANG_STORE_KEY)
    }

    return {
        setLang,
        getLang,
        removeLang
    }
})