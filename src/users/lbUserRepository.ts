import {Done, IUserRepository, User} from "./ifaces";
import { getAllMessage,  getOneMessage, createMessage, updateMessage, deleteMessage, MessageResponse} from "./messages"
import {notFound} from "../errors/helper";

const MESSAGE = "message"
export class lbUserRepository implements IUserRepository {
    constructor() {
    }

    async getAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            // process.send(getAllMessage())
            process.once(MESSAGE, this.handleResponce<User[]>(resolve, reject))
        })
    }

    getOne(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            // process.send(getOneMessage(id))
            process.once(MESSAGE, this.handleResponce<User>(resolve, reject))
        })
    }

    create(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            // process.send(createMessage(user)?createMessage(user):"stop")
            process.once(MESSAGE, this.handleResponce<User>(resolve, reject))
        })
    }

    delete(id: string): Promise<Done> {
        return new Promise((resolve, reject) => {
            // process.send(deleteMessage(id))
            process.once(MESSAGE, this.handleResponce<Done>(resolve, reject))
        })
    }

    update(id: string, user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            // process.send(updateMessage(id, user))
            process.once(MESSAGE, this.handleResponce<User>(resolve, reject))
        })
    }

    private handleResponce<T>(
        resolve: (value: T | PromiseLike<T>) => void,
        reject: (reason?: any) => void
    ){
        return (response: MessageResponse<T>) => {
            if (response.data) {
                resolve(response.data)
            } else {
                reject(notFound(response.message))
            }
        }
    }

}