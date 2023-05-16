import {IncomingMessage, ServerResponse} from "http";
import {HTTPCodes, IUserController, IUserService} from "./ifaces";
import {getBody, getId} from "./helper"

export class UserController implements IUserController{
    constructor(private userService:IUserService) {}
    async getAll(_: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        const users = await this.userService.getAll()
        this.sendResponse(res,users)
    }
    async getOne(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        const id = getId(<string>req.url)
        const users = await this.userService.getOne(<string>id)
        this.sendResponse(res,users)
    }
    async create(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        const body = await getBody(req)
        const newUser = await this.userService.create(body)
        this.sendResponse(res, newUser, HTTPCodes.CREATED)
    }
    async delete(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        const id = getId(<string>req.url)
        const deleted = await this.userService.delete(<string>id)
        this.sendResponse(res,deleted, HTTPCodes.NO_CONTENT)
    }
    async update(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        const id = getId(<string>req.url)
        const body = await getBody(req)
        const updatedUser = await this.userService.update(<string>id, body)
        this.sendResponse(res,updatedUser)
    }
    private sendResponse<T>(
        res: ServerResponse<IncomingMessage>,
        data: T,
        status: HTTPCodes = HTTPCodes.OK
    ) {
        res.statusCode = status
        res.end(JSON.stringify(data))
    }
}