import {server} from "../src"
import supertest from "supertest"
import {HTTPCodes, User} from "../src/users/ifaces"
const testsrv = supertest(server)
const user: User = { // test user
    username: "John",
    age: 30,
    hobbies: ["scvosh", "football"]
}
let userid: string  // for using in following tests
const apiusers:string = '/api/users'
describe('Scenario 1: Get all records with a GET api/users request',
    () => {
        it('an empty array is expected', async () => {
            await testsrv.get(apiusers).expect(HTTPCodes.OK, [])
        })
    })
describe('Scenario 2: A new object is created by a POST api/users request',
    () => {
        it('response containing newly created record is expected', async () => {
            const res = await testsrv.post(apiusers).send(user)
            expect(res.statusCode).toBe(HTTPCodes.CREATED)
            userid = res.body.id       // !! for using in following tests
            expect(res.body).toEqual({...user, id: userid} )
        })
    })
describe('Scenario 3: With a GET api/user/{userId} request,\n\t' +
    'we try to get record by its id, which was created in  previos Scenario 2 ',
    () => {
        it('the created record is expected', async () => {
            const res = await testsrv.get(`${apiusers}/${userid}`).send(user)
            expect(res.statusCode).toBe(HTTPCodes.OK)
            expect(res.body.username).toEqual(user.username)
        })
    })