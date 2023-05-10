export const enum ErrCode {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    SRV_SIDE_ERR = 500
}
export enum ErrMsg  {
    INVALID_ID= "Id is wrong",
    INVALID_DATA= "JSON Data is wrong",
    NO_ENDPOINT= "Endpoint wrong",
    NO_METHOD= "Method wrong",
    SRV_SIDE_ERR= "Server side error",
}

export function getIdNotFoundMessage(id:string) {
    return `Not Found Message with id = ${id}`
}