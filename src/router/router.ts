import {IncomingMessage, ServerResponse} from "http"
import {ApiError} from "../errors/ApiError"
import {UserController} from "../users/controller"
import {ErrCode, ErrMsg, endpontNotFoundMsg, badRequest, notFound, srv_side_err} from "../errors/helper"
import {UserRepository} from "../users/repository"
import {UserService} from "../users/service"
import {API_URL, API_URL_WITH_ID, METHOD, IUserRepository} from "../users/ifaces";

export const router = (processPort: number) => {
    const userRepository = new UserRepository([])
    const userService = new UserService(<IUserRepository>userRepository)
    const userController = new UserController(userService)
    return async (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader("Content-Type", "application/json")
        try {
            const {url, method} = req
            if (!url) throw notFound(endpontNotFoundMsg(<string>method, <string>url))
            if (!url.match(API_URL) && !url.match(API_URL_WITH_ID)) {
                throw notFound(endpontNotFoundMsg(<string>method, <string>url))
            }
            console.log(`>> ${method} ${url} >>  #${process.pid}:${processPort}`)
            switch (method) {
                case METHOD.GET:
                    if (url.match(API_URL_WITH_ID)) {
                        await userController.getOne(req, res)
                    } else {
                        await userController.getAll(req, res)
                    }
                    break
                case METHOD.POST:
                    if (!url.match(API_URL)) {
                        throw notFound(endpontNotFoundMsg(<string>method, <string>url))
                    }
                    await userController.create(req, res)
                    break
                case METHOD.PUT:
                    await userController.update(req, res)
                    break
                case METHOD.DELETE:
                    await userController.delete(req, res)
                    break
                default:
                    throw badRequest(ErrMsg.NO_METHOD)
            }
        } catch (error) {
            const {status, message} = error instanceof ApiError
                ? error : srv_side_err()
            res.statusCode = status
            res.end(JSON.stringify({message}))
        }
    }
}