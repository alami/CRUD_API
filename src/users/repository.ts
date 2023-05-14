import {v4 as uuidv4} from "uuid"
import {ApiError} from "../errors/ApiError";
import {ErrMsg, idNotFoundMsg, notFound} from "../errors/helper";
import { User, Done, IUserRepository, IUserService } from "./ifaces";

export class UserRepository implements IUserRepository {
    constructor(private users: User[]) {
    }
    async getAll(): Promise<User[]> {
        return this.users
    }
    async getOne(id: string): Promise<User> {
        const user = this.users.find(user => user.id === id)
        if (user) return (user)
        throw notFound(idNotFoundMsg(id))
    }
    async create(user: User): Promise<User> {
        const newUser = {...user, id: uuidv4()}
        this.users.push(newUser)
        return newUser
    }
    async delete(id: string) : Promise<Done> {//:  {
        return new Promise((resolve, reject) => {
            const candidate = this.users.find(user => user.id === id)
            if (candidate) {
                this.users.splice(this.users.indexOf(candidate),1)
                resolve("done")
            } else {
                reject(notFound(idNotFoundMsg(id)))
            }
        })
    }
    async update(id: string, user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            const candidate = this.users.find(user => user.id === id)
            if (!candidate) {
                reject(notFound(idNotFoundMsg(id)))
            } else {
                const updateUser = {...user, id}
                 this.users[this.users.indexOf(candidate)] = updateUser
                resolve(updateUser)
            }
        })
    }
}