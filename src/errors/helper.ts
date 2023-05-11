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
export function endpontNotFoundMsg(method:string, url:string) {
    return `!> ${method}: ${url}\`Not Found`
}