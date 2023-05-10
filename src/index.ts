import * as process from 'process';
import * as http from 'http';
import * as  uuid from 'uuid';
import {router} from './router/router'
import {balancer} from './balancer/balancer'
import data from './users/data.json'
import "dotenv/config"
import * as util from "util";

let PORT_API = Number(process.env.DEV_PORT)
if (process.env.STATUS === 'dev')
    PORT_API = Number(process.env.DEV_PORT)
else
    PORT_API = Number(process.env.PROD_PORT)

const HOSTNAME = process.env.HOSTNAME

const server = http.createServer(
    router(PORT_API)
);

server.listen(PORT_API,
    HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT_API}/`);
});
