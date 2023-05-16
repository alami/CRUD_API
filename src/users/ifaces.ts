import {IncomingMessage, ServerResponse} from "http";

export const enum HTTPCodes {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
}
export interface User {
    id?: string
    username: string
    age: number
    hobbies: string[]
}
export interface UserDto {
    username: string
    age: number
    hobbies: string[]
}

export type Done = "done"

type RouteHandler = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>
) => Promise<void>
export interface IUserController {
    getAll: RouteHandler
    getOne: RouteHandler
    create: RouteHandler
    delete: RouteHandler
    update: RouteHandler
}
export interface IUserService {
    getAll: () => Promise<User[]>
    getOne: (id: string) => Promise<User>
    create: (user: unknown) => Promise<User>
    delete: (id: string) => Promise<Done>
    update: (id: string, user: unknown) => Promise<User>
}
export interface IUserRepository {
    getAll: () => Promise<User[]>
    getOne: (id: string) => Promise<User>
    create: (user: User) => Promise<User>
    delete: (id: string) => Promise<Done>
    update: (id: string, user: User) => Promise<User>
}

export const API_URL = /^\/api\/users\/?$/
export const API_URL_WITH_ID = /^\/api\/users\/[^\/]+$/
export const enum METHOD {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
