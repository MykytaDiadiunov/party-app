export interface CurrentSessionUser {
    token: string,
    user: CurrentUser
}

export interface CurrentUser {
    id: number,
    username: string,
    email: string,
    points: number 
}

export interface User {
    id: number,
    username: string,
    email: string
}