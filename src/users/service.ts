import {validate} from "uuid";
import { User, Done, IUserService, IUserRepository} from "./ifaces";
import {ApiError} from "../errors/ApiError";
import {badRequest, ErrMsg} from "../errors/helper";
export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {
    }
    async getAll() {
        return this.userRepository.getAll()
    }
    async getOne (id:string) {
        if (!validate) {
            throw badRequest(ErrMsg.INVALID_ID)
        }
        return this.userRepository.getOne(id)
    }
    async create (user:unknown) {
        if (!validate) {
            throw badRequest(ErrMsg.INVALID_DATA)
        }
        return this.userRepository.create(<User>user)
    }

    delete(id: string): Promise<Done> {
        if (!validate) {
            throw badRequest(ErrMsg.INVALID_ID)
        }
        return this.userRepository.delete(id)
    }

    update(id: string, user: unknown): Promise<User> {
        if (!validate) {
            throw badRequest(ErrMsg.INVALID_ID)
        }
        return this.userRepository.update(id, <User>user)
    }

}