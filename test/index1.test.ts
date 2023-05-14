import {HTTPCodes} from "../src/users/ifaces";
import {server} from "../src"
import supertest from "supertest"
const testsrv = supertest(server)
describe('scen01: Get all records with a GET api/users request',
    () => {
        it('an empty array is expected', async () => {
            await testsrv.get("/api/users").expect(HTTPCodes.OK, [])
        })
    })

