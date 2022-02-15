const request = require('supertest')
const {Order} = require('../../model/order')
let server;

describe('Orders Tests',()=>{

beforeEach(()=>{
     server = require('../../app')
})

afterEach(async()=>{
    await server.close()
})

describe('Add order',()=>{
    it('should add order',async ()=>{
        const result = await request(server).post("/api/orders").send({
            userID:"a",
            orderID:"1",
            orderComplete:false,
            oderItems:[
                {productID:"2",
                quantity:3}
            ],
            orderAmount:9
        })
        expect(result.status).toBe(200)
    })
    
})

})