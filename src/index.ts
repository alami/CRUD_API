import * as process from 'process';
import {router} from './router/router'
import {balancer} from './balancer/balancer'
import {getProcessStatus} from './users/utils'

const DEFAULT_API_PORT = 3000
const CLUSTER = "cluster"

const { CRUD_API_MODE } = process.env



console.log('Hello world')