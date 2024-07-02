const request = require('supertest');
const app = require('../app');

const BASE_URL = '/api/v1/products';

//Local product
const product = {
    title: "Product 1",
    description: "Description",
    categoryId: 1,//GLOBAL CATEGORY ID.
    price: 5
};
let globalToken;
let productId;


beforeAll(async () => {
    //FIRST WE HAVE TO LOGIN A USER TO GET A TOKEN.
    const res = await request(app)
        .post(`/api/v1/users/login`)
        .send({email: "pepito@gmail.com", password: "pepito"});

    globalToken = res.body.token;
});

//CREATE:
test("Post -> 'BASE_URL', should return status code 201 and res.body.name === product.name", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .set('Authorization', `Bearer ${globalToken}`)
    .send(product);

  productId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(product.name);
});

// //GET ALL:
test("Get -> 'BASE_URL', should return status code 200 and res.body to have length = 1", async () => {
    const res = await request(app)
        .get(BASE_URL);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);//ONLY LOCAL PRODUCT EXISTS NOW.
})

// //GET ONE TEST:
test("Get -> 'BASE_URL/:id', should return status code 200, res.body.name === product.name", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${productId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(product.name);
});

// //UPDATE TEST:
test("Put -> 'BASE_URL/:id', should return status code 200, res.body.name === productUpdate.name ", async () => {
  const productUpdate = {
    title: "Product Update",
  };

  const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .set('Authorization', `Bearer ${globalToken}`)
    .send(productUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(productUpdate.name);
});

//DELETE TEST:
test("Delete -> 'BASE_URL/:id', should return status code 204 ", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set('Authorization', `Bearer ${globalToken}`);

  expect(res.status).toBe(204);
});