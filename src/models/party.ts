import { CurrentUser } from "./user"

export interface PartiesResponse {
    items: Party[],
    total: number,
    currentPage: number,
    lastPage: number
}

export interface Party {
    id: number,
    title: string,
    description: string,
    image: string,
    price: number,
    startDate: string,
    creatorId: CurrentUser
}

export interface ExistsInPartyResponse {
    isJoined: boolean
}

export interface CreateParty {
    title: string,
    description: string,
    image: string,
    price: number,
    startDate: string
}