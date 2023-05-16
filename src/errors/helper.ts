import {ApiError} from "./ApiError";

export const enum ErrCode {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    SRV_SIDE_ERR = 500
}
export enum ErrMsg  {
    INVALID_ID= "Id is wrong",
    INVALID_DATA= "JSON in body data not vaid",
    NO_ENDPOINT= "Endpoint is wrong",
    NO_METHOD= "Method not vaid",
    SRV_SIDE_ERR= "Server side error",
}
export function idNotFoundMsg(id:string) {
    return `User ${id} Not Found`
}

export function endpontNotFoundMsg(method: string, url: string) {
    return `${method} ${url} endpoint Not Found`
}

export function badRequest(message: string) {
    return new ApiError(ErrCode.BAD_REQUEST, message)
}

export function notFound(message: string) {
    return new ApiError(ErrCode.NOT_FOUND, message)
}

export function srv_side_err() {
    return new ApiError(ErrCode.SRV_SIDE_ERR, ErrMsg.SRV_SIDE_ERR)
}