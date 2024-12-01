import type { CurrentSessionUser, CurrentUser } from "@/models"
import { requestService, routingService } from "@/services"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useTokenStore } from "./token-store"
import { USER_STORE_KEY } from "@/constants";


export const useUserStore = defineStore('userStore', () => {    
    const routing = routingService()
    const request = requestService()

    const tokenStore = useTokenStore()

    const currentUser = ref<CurrentUser | null>(null)

    function setCurrentUserData(value: CurrentUser | null) {
        localStorage.setItem(USER_STORE_KEY, JSON.stringify(value))
        currentUser.value = value
    }

    function getCurrentUserData(): CurrentUser | null {
        try{
            const userStr: string | null = localStorage.getItem(USER_STORE_KEY)
            setCurrentUserData(userStr ? JSON.parse(userStr) : null)

            if(currentUser.value) {
                return currentUser.value
            }
            else {
                return null
            }
        } catch(e: any) {
            console.error(e)
            destroyUserData()
            return null
        }
    }

    async function populateUser(): Promise<void> {
        try {

            const token: string | null = tokenStore.getToken()

            if(!token){
                destroyUserData()
                return;
            }
            const updatedUser: CurrentUser = await request.getCurrentUser()

            if(!updatedUser) {
                destroyUserData()
            }

            setCurrentUserData(updatedUser)

        } catch(e: any) {
            console.error(e)
            destroyUserData()
        }   
    }

    async function logout(): Promise<void> {
        try {
            if(currentUser.value) {
                await request.logout()
                destroyUserData()
            }
        } catch(e: any) {
            console.error(e)
        }

    }

    function destroyUserData() {
        localStorage.removeItem(USER_STORE_KEY)
        tokenStore.removeToken()
        currentUser.value = null
        routing.toSignIn()
    }

    return {
        setCurrentUserData,
        getCurrentUserData,
        populateUser,
        logout
    }
  })