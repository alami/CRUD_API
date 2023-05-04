import * as process from 'process';
import * as http from 'http';
import * as dotenv from 'dotenv';
import {router} from './router/router'
import {balancer} from './balancer/balancer'
import {getProcessStatus} from './users/utils'
//import data from './users/data.json' assert {type: 'json'}

dotenv.config()
const PORT_API = Number(process.env.DEV_PORT)
const HOSTNAME = process.env.HOSTNAME
const CLUSTER = "cluster"
const { CRUD_API_MODE } = process.env

let data = [
    { "id": 1, "username": "John", "age": 30 , "hobbies": ["scvosh"] },
    { "id": 2, "username": "Mary", "age": 25 , "hobbies": ["football"] },
    { "id": 3, "username": "Peter", "age": 35 , "hobbies": ["basketball"] },
    { "id": 4, "username": "Peter", "age": 35 , "hobbies": [] }
]

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
    console.log(`Server running at http://${PORT_API}:${HOSTNAME}/`);
});

console.log('CRUD API started')