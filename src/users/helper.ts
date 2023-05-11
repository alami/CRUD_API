import {IncomingMessage} from "http";
import {User} from "./ifaces";
import {ApiError} from "../errors/ApiError";
import {ErrMsg} from "../errors/helper";
import cluster from "cluster";

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
            const body = Buffer.concat(buff).toString().trim()
            try {
                resolve(body?JSON.parse(body):{})
            }catch (e) {
                reject(ApiError.badRequest(ErrMsg.INVALID_DATA))
            }
        }).on("error",()=>{reject()})
    })
}
export const isUser = (obj:Partial<User>):obj is User => {
    return (
        typeof obj.username === "string" &&
        typeof obj.age === "number" &&
        Array.isArray(obj.hobbies) &&
        obj.hobbies.every((h)=>typeof h === "string")
    )
}
export function getProcState () {
    return  process.env.CRUD_API_MODE === "cluster"
        ? cluster.isPrimary ? "PrimaryApp" : "WorkerApp"
        : "AloneApp"+' >> '
}

export function getInvalidEndpointMessage  (method: string, url: string){
    return `cannot ${method} ${url}`
}