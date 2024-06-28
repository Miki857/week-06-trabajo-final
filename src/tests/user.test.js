const request = require('supertest');
const app = require('../app');

const BASE_URL = '/api/v1/users';
let TOKEN;

let user;
let userId;
let userToken;

beforeAll(async () => {
    user = {
        firstName: "Jesus",
        lastName: "Carrasquilla",
        email: "jesus@gmail.com",
        password: "jesus1234",
        phone: "+00 123456789"
    }

    const body = {
        email: "pepito@gmail.com",
        password: "pepito"
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(body);

    TOKEN = res.body.token;
});

//CREATE TEST:
test("POST -> 'BASE_URL', should return statusCode 201, and res.body.firstname === user.firstName", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(user);

    const login = await request(app)
        .post(`${BASE_URL}/login`)
        .send(user);

    userId = login.body.user.id;
    userToken = login.body.token;

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
});

//GET USER WITH TOKEN TEST:
test("GET -> 'BASE_URL', should return status code 200, and res.body.length === 2", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .send('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200);
});

//GET ONE TEST:
test("Get -> 'BASE_URL/:id', should return status code 200, res.body.name === user.name", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/${userId}`)// El de id 1 es el que creamos para el GET WITH TOKEN.
      .set('Authorization', `Bearer ${userToken}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(user.name);
});
  
//UPDATE TEST:
test("Put -> 'BASE_URL/:id', should return status code 200, res.body.name === user.name ", async () => {
    const userUpdate = {
        firstName: "Pedro"
    };

    const res = await request(app)
        .put(`${BASE_URL}/${userId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(userUpdate);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(userUpdate.name);
});

//DELETE TEST:
test("Delete -> 'BASE_URL/:id', should return status code 204 ", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(204);
});
