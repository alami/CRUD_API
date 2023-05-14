import {IncomingMessage} from "http";
import {User} from "./ifaces";
import {badRequest, ErrMsg} from "../errors/helper";

export function getId (url:string) {
    const IDs = url.match(/\/api\/users\/([\w-]+)/)
    return IDs?IDs[1]:null
}
export async function getBody (request: IncomingMessage): Promise<{}>  {
    const buff:Uint8Array[]=[]
    return new Promise((resolve, reject)=>{
        const buff:Uint8Array[]=[]
        request.on("data", (chunk:Uint8Array)=>{
            buff.push(chunk)
        }).on("end",()=>{
            const body = Buffer.concat(buff).toString()
            try {
                resolve(body?JSON.parse(body):{})
            }catch (e) {
                reject(badRequest(ErrMsg.INVALID_DATA))
            }
        }).on("error",()=>{reject()})
    })
}
export const isValidUser = (obj:Partial<User>):obj is User => {
    return (
        typeof obj.username === "string" &&
        typeof obj.age === "number" &&
        Array.isArray(obj.hobbies) &&
        obj.hobbies.every((h)=>typeof h === "string")
    )
}
export const CONTENT_TYPE  = "application/json"
export const HOST = "localhost"