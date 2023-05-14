import os from "os";
import cluster from "cluster";
import {IncomingMessage, request, ServerResponse} from "http";
import {UserRepository} from "../users/repository";
import {CONTENT_TYPE, HOST} from "../users/helper";
import {Message} from "../users/messages"
import {ApiError} from "../errors/ApiError";
import router from "./router";

export const loadbalancer = (lbPort: number) => {
    return router(lbPort)
    const coresCount = os.cpus().length
    const userRepository = new UserRepository([])
    console.log(coresCount)
    const workerPorts = new Array(coresCount).fill(null)
        .map((_, index) => {
            const workerPort = lbPort + index + 1
            if (cluster.isMaster) {   // Обработчик ведущего процесса
                const worker = cluster.fork({workerPort})
                worker.on("message", console.log);
                worker.on("error", console.log);
                worker.on("exit", console.log);
            } else {
                console.log(`Worker ${process.pid} started`);   // Обработчик дочерних процессов
            }
            return workerPort
        })
    console.log(workerPorts)
        /*.map((_, index) => {
            const workerPort = balancerPort + index + 1

            const worker = cluster.fork(/!*{workerPort}*!/)

            /!*worker.on("message", async (message: Message) => {
                const userRepositoryMethod
                    = userRepository[message.action]
                const args = "args" in message ? message.args : [];
                /!*userRepositoryMethod
                    .apply(userRepository, args)
                    .then((data: Awaited<ReturnType<typeof userRepositoryMethod>>) => {
                        worker.send({data})
                    })
                    .catch((error: ApiError) => {
                        worker.send({status: error.status, message: error.message})
                    })*!/
            })*!/
            return workerPort
        })*/

    let nextPortIndex = 0

    /*return (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
        const port = workerPorts[nextPortIndex++ % coresCount]
        const connector = request(
            {
                host: HOST,
                path: req.url,
                method: req.method,
                headers: req.headers,
                port
            },
            (workerResponse) => {
                res.statusCode = workerResponse.statusCode ? workerResponse.statusCode : 200
                res.setHeader(CONTENT_TYPE, workerResponse.headers[CONTENT_TYPE] ?
                    workerResponse.headers[CONTENT_TYPE] : "application/json")
                workerResponse.pipe(res)
            }
        )
        req.pipe(connector)
    }*/
}