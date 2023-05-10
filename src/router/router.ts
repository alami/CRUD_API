import {IncomingMessage, ServerResponse} from "http"
import {ApiError} from "../errors/ApiError"
import {UserController} from "../users/controller"
import {ErrCode, ErrMsg} from "../errors/constants"
import {UserRepository} from  "../users/repository"
import {UserService} from  "../users/service"
import {API_URL, API_URL_WITH_ID, METHOD, IUserRepository} from "../users/ifaces";
import * as http from "http";
import * as util from "util";
import {getInvalidEndpointMessage, getProcState} from "../users/utils";

export function router (processPort: number) {
    const userRepository =  new UserRepository([])
    const userService = new UserService(<IUserRepository>userRepository)
    const userController = new UserController(userService)
    const procState = getProcState()
    return async (req:IncomingMessage, res:ServerResponse) => {
        res.setHeader("Content-Type", "application/json")
        try {
            const {url, method} = req
            if (!url) throw ApiError.notFound(getInvalidEndpointMessage(<string>method, <string>url))
            if (!url.match(API_URL) && !url.match(API_URL_WITH_ID)) {
                throw ApiError.notFound(getInvalidEndpointMessage(<string>method, <string>url))
            }
            console.log(`${method} ${url} >> ${procState} PID#${process.pid} on port ${processPort}`)
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
                        throw ApiError.notFound(getInvalidEndpointMessage(<string>method, <string>url))
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
                    throw ApiError.badRequest(ErrMsg.NO_METHOD)
            }
        } catch (error) {
            const {status, message} = error instanceof ApiError
                ? error : ApiError.internal()
        }
    }
}