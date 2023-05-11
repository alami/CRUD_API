import {ErrCode, ErrMsg} from "./helper";
export class ApiError extends Error{
    constructor(public status: number, public message: string) {
        super()
    }
    static badRequest (message: string) {
        return new ApiError(ErrCode.BAD_REQUEST, message)
    }
    static notFound (message: string) {
        return new ApiError(ErrCode.NOT_FOUND, message)
    }
    static srv_side_err () {
        return new ApiError(ErrCode.SRV_SIDE_ERR, ErrMsg.SRV_SIDE_ERR)
    }
}
