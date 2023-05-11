import {v4 as uuidv4} from "uuid"
import {ApiError} from "../errors/ApiError";
import {ErrMsg, getIdNotFoundMessage} from "../errors/helper";
import { User, Done, IUserRepository, IUserService } from "./ifaces";
import data from './data.json'

export class UserRepository implements IUserRepository {
    constructor(private users: User[]) {
        for(var i in data) this.users.push(<User> data[i])
        //console.log(`----- src/users/repository.ts -----\n`,users)
    }

    async getAll(): Promise<User[]> {
        //return new Promise(resolve => resolve(this.users))
        return this.users
    }

    async getOne(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            const user = this.users.find(user => user.id === id)
            if (user) resolve(user)
            reject(ApiError.notFound(getIdNotFoundMessage(id)))
        })
        // const user = this.users.find(user => user.id === id)
        // if (user) return (user)
        // throw ApiError.notFound(getIdNotFoundMessage(id))
    }

    async create(user: User): Promise<User> {
        return new Promise(resolve => {
            const newUser = {...user, id: uuidv4()}
            this.users.push(newUser)
            resolve(newUser)
        })
    }

    async delete(id: string) : Promise<Done> {//:  {
        return new Promise((resolve, reject) => {
            const candidate = this.users.find(user => user.id === id)
            if (candidate) {
                this.users.splice(this.users.indexOf(candidate),1)
                resolve("done")
            } else {
                reject(ApiError.notFound(getIdNotFoundMessage(id)))
            }
        })
    }
    async update(id: string, user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            const candidate = this.users.find(user => user.id === id)
            if (!candidate) {
                reject(ApiError.notFound(getIdNotFoundMessage(id)))
            } else {
                const updateUser = {...user, id}
                this.users.splice(this.users.indexOf(candidate), 1, updateUser )
                resolve(updateUser)
            }
        })
    }
}