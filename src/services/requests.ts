import { CreateParty, CurrentSessionUser, CurrentUser,  ExistsInFavoritesResponse, ExistsInPartyResponse, FavoritesResponse, LoginRequest, PartiesResponse, PartyWithMembers, RegisterRequest, UpdateParty } from "@/models"
import { apiService } from "./api"

export const requestService = () => {
    const api = apiService()

    //Auth requests
    async function register(body: RegisterRequest): Promise<CurrentSessionUser> {
        return await api.post(`/auth/register`, body)
    }

    async function login(body: LoginRequest): Promise<CurrentSessionUser> {
        return await api.post(`/auth/login`, body)
    }

    async function logout(): Promise<void> {
        return await api.del('/auth/logout')
    }

    //User actions requests
    async function getCurrentUser(): Promise<CurrentUser> {
        return await api.get('/user/me')
    }

    async function getUserById(userId: number): Promise<CurrentUser> {
        return await api.get(`/user/${userId}`)
    }

    //Action with users
    async function checkExistsInFavorites(userId: number): Promise<ExistsInFavoritesResponse> {
        return await api.get(`/user/me/favorite/check/${userId}`)
    }

    async function addToFavorites(userId: number): Promise<void> {
        return await api.get(`/user/me/favorite/add/${userId}`)
    }

    async function removeFromFavorites(userId: number): Promise<void> {
        return await api.del(`/user/me/favorite/remove/${userId}`)
    }

    async function getFavoriteUsers(): Promise<FavoritesResponse> {
        return await api.get(`/user/me/favorite/users`)
    }

    async function getFavoriteUsersParty(page: number, limit: number): Promise<PartiesResponse> {
        return await api.get(`/user/me/favorite/users/parties?page=${page}&limit=${limit}`)
    }

    async function getUsersByLikedId(likedId: number) {
        return await api.get(`/user/favorite/${likedId}`)
    }

    //Parties requests
    async function getParties(page: number): Promise<PartiesResponse> {
        return await api.get(`/parties?page=${page}&limit=10`)
    }

    async function getPartiesByCreatorId(creatorId: number, page: number): Promise<PartiesResponse> {
        return await api.get(`/parties/creator/${creatorId}?page=${page}&limit=10`)
    }

    async function getPartyById(partyId: number): Promise<PartyWithMembers> {
        return await api.get(`/party/${partyId}`)
    }

    async function craeteParty(body: CreateParty): Promise<PartyWithMembers> {
        return await api.post(`/party`, body)
    }

    async function udapteParty(partyId: number, body: UpdateParty): Promise<PartyWithMembers> {
        return await api.put(`/party/${partyId}`, body)
    }

    async function deleteParty(partyId: number): Promise<void> {
        return await api.del(`/party/${partyId}`)
    }

    //Party actions requests
    async function checkExistsInParty(partyId: number): Promise<ExistsInPartyResponse> {
        return await api.get(`/actions/party/check/${partyId}`)
    }

    async function joinToParty(partyId: number): Promise<void> {
        return await api.get(`/actions/party/join/${partyId}`)
    }

    async function leaveFromParty(partyId: number): Promise<void> {
        return await api.del(`/actions/party/leave/${partyId}`)
    }

    return {
        register,
        login,
        logout,
        getCurrentUser,
        getUserById,
        getParties,
        checkExistsInParty,
        joinToParty,
        leaveFromParty,
        checkExistsInFavorites,
        addToFavorites,
        removeFromFavorites,
        getPartiesByCreatorId,
        getFavoriteUsers,
        craeteParty,
        getFavoriteUsersParty,
        udapteParty,
        deleteParty,
        getPartyById,
        getUsersByLikedId
    }
}