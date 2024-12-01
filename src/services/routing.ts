import { useIonRouter } from "@ionic/vue"


export const routingService = () => {
    const router = useIonRouter()

    function toBack(): void {
        router.back()
    }

    function toSignIn(): void {
        router.navigate({ name: "SignIn" })
    }

    function toSignUp(): void {
        router.navigate({ name: "SignUp" })
    }

    function toParties(): void {
        router.push({ name: 'Parties' })
    }

    function toProfile(): void {
        router.push({ name: 'Profile' })
    }

    function toFavorites(): void {
        router.push({ name: 'Favorites' })
    }

    function toMyParties(): void {
        router.push({ name: 'MyParties' })
    }

    function toUserProfile(userId: number): void {
        router.push({name: 'User', params: { id: userId }})
    }

    return {
        toBack,
        toSignIn,
        toSignUp,
        toParties,
        toProfile,
        toFavorites,
        toMyParties,
        toUserProfile,
    }
}