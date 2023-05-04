import * as process from 'process';
import * as http from 'http';
import * as dotenv from 'dotenv';
import * as  uuid from 'uuid';
import {router} from './router/router'
import {balancer} from './balancer/balancer'
import {getProcessStatus} from './users/utils'
import data from './users/data.json'

dotenv.config()
let PORT_API = Number(process.env.DEV_PORT)
if (process.env.STATUS === 'dev')
    PORT_API = Number(process.env.DEV_PORT)
else
    PORT_API = Number(process.env.PROD_PORT)

const HOSTNAME = process.env.HOSTNAME

const server = http.createServer(
    (req, res) => {
        if (req.method === 'POST' && req.url === '/api/users') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const newData = JSON.parse(body);
                data.push(newData);
                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(newData));
            });
        }
        /*if (req.method === 'PUT' && req.url.startsWith('/data/')) {
            const id = parseInt(req.url.split('/')[2]);
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const updatedData = JSON.parse(body);
                data[id] = updatedData;
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(updatedData));
            });
        }*/
        /*if (req.method === 'DELETE' && req.url.startsWith('/data/')) {
            const id = parseInt(req.url.split('/')[2]);
            data.splice(id, 1);
            res.writeHead(204);
            res.end();
        }*/
        if (req.method === 'GET' && req.url === '/api/users') {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
            }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Sorry, wrong URL: ');
        }
});

server.listen(PORT_API,
    HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT_API}/`);
});
