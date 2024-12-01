import { defineStore } from "pinia";
import { ref } from "vue";
import { TOKEN_STORE_KEY } from "@/constants";

export const useTokenStore = defineStore('tokenStore', () => {

    const token = ref<string | null>(null)

    function getToken(): string | null {
        token.value = localStorage.getItem(TOKEN_STORE_KEY)
        if (token.value) {
            return token.value
        }
        return null
    }

    function setToken(newToken: string): void {
        localStorage.setItem(TOKEN_STORE_KEY, newToken)
        token.value = newToken
    }

    function removeToken(): void {
        localStorage.removeItem(TOKEN_STORE_KEY)
    }

    return {
        getToken,
        setToken,
        removeToken
    }
})