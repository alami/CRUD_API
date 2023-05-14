import * as process from 'process';
import * as http from 'http';
import {router} from './router/router'
import "dotenv/config"

let PORT_API = Number(process.env.DEV_PORT)
if (process.env.STATUS === 'dev')
    PORT_API = Number(process.env.DEV_PORT)
else
    PORT_API = Number(process.env.PROD_PORT)

const HOSTNAME = process.env.HOSTNAME

let {APP_MODE} = process.env
APP_MODE = (APP_MODE!==undefined)?'LOADBALANCER':'STANDALONE'

const server = http.createServer(
    (APP_MODE==="STANDALONE") ? router(PORT_API) : router(PORT_API)
)

server.listen(PORT_API,
    HOSTNAME, () => {
    console.log(`App was running at http://${HOSTNAME}:${PORT_API}/ in ${APP_MODE} mode`);
});