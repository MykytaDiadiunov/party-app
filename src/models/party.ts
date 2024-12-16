import { CurrentUser, User } from "./user"

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

export interface PartyWithMembers {
    id: number,
    title: string,
    description: string,
    image: string,
    price: number,
    startDate: string,
    creatorId: CurrentUser
    members: User[]
}

export interface ExistsInPartyResponse {
    isJoined: boolean
}

export interface CreateParty {
    title: string,
    description: string,
    image: string | null,
    price: number,
    startDate: string
}

export interface UpdateParty {
    title: string,
    description: string,
    image: string | null,
    startDate: string
}