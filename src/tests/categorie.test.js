const request = require('supertest');
const app = require('../app');

let categoryId;

const category = {
  name: "Categorie 1"
};

const BASE_URL = '/api/v1/categories';

let userToken;
beforeAll(async () => {
    //FIRST WE HAVE TO LOGIN A USER TO GET A TOKEN.
    const res = await request(app)
        .post(`/api/v1/users/login`)
        .send({email: "pepito@gmail.com", password: "pepito"});
    
    userToken = res.body.token;
});

//CREATE TEST:
test("Post -> 'BASE_URL', should return status code 201 and res.body.name === category.name", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .set('Authorization', `Bearer ${userToken}`)
    .send(category);

  categoryId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(category.name);
});

//GET ONE TEST:
test("Get -> 'BASE_URL/:id', should return status code 200, res.body.name === category.name", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${categoryId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(category.name);
});

//DELETE TEST:
test("Delete -> 'BASE_URL/:id', should return status code 204 ", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${categoryId}`)
    .set('Authorization', `Bearer ${userToken}`);

  expect(res.status).toBe(204);
});
