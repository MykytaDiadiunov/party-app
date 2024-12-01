import { User } from "./user"

export interface ExistsInFavoritesResponse {
    isLiked: boolean
}

export interface FavoritesResponse {
    users: User[]
}