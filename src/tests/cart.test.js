const request = require('supertest');
const app = require('../app');
const BASE_URL = '/api/v1/carts';

//LOCAL CART:
let localCartId;

//GLOBAL USER:
let globalToken;
let userId;

//LOCAL PRODUCT TO ADD TO CART:
let productId;
const product = {
    title: "Product 1",
    description: "Description",
    categoryId: 1,//GLOBAL CATEGORY ID.
    price: 5
};

beforeAll(async () => {
  //FIRST WE HAVE TO LOGIN A USER TO GET A TOKEN.
  const res = await request(app)
      .post(`/api/v1/users/login`)
      .send({email: "pepito@gmail.com", password: "pepito"});

  globalToken = res.body.token;
  userId = res.body.user.id;

  //CREATE LOCAL PRODUCT: MUST BE DELETED AT END.
  const resProduct = await request(app)
      .post("/api/v1/products")
      .send(product)
      .set('Authorization', `Bearer ${globalToken}`)

  productId = resProduct.body.id;
});

//CREATE PRODUCT ON CART:
test("Post -> 'BASE_URL', should return status code 201 and res.body.productId === body.productId", async () => {
  const body = {
      productId: productId,
      quantity: 5
  }

  const res = await request(app)
    .post(BASE_URL)
    .set('Authorization', `Bearer ${globalToken}`)
    .send(body);

  localCartId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.productId).toBe(body.productId);
});

//GET PRODUCT ON CART:
test("GET -> 'BASE_URL', should return status code 200 and res.body.productId === productId", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${userId}`)
    .set('Authorization', `Bearer ${globalToken}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.productId).toBe(productId);
});

//GET ALL USER PRODUCTS ON CART:
test("GET -> 'BASE_URL', should return status code 200 and res.body.length === 1", async () => {
  const res = await request(app)
    .get(`${BASE_URL}`)
    .set('Authorization', `Bearer ${globalToken}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.length).toBe(1);
});

//UPDATE:
test("Put -> 'BASE_URL/:id', should return status code 200, res.body.name === productUpdate.name ", async () => {
  const productUpdate = {
    productId: productId,
    quantity: 7
  };

  const res = await request(app)
    .put(`${BASE_URL}/${localCartId}`)
    .set('Authorization', `Bearer ${globalToken}`)
    .send(productUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(productUpdate.quantity);
});

//DELETE:
test("Delete -> 'BASE_URL/:id', should return status code 204 ", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${localCartId}`)
    .set('Authorization', `Bearer ${globalToken}`);

  expect(res.status).toBe(204);
});

afterAll(async () => {
  //DELETE LOCAL PRODUCT:
  const res = await request(app)//BEFORE DELETE IT, CART MUST BE DELETE. PK RESTRICTIONS.
    .delete(`/api/v1/products/${productId}`)
    .set('Authorization', `Bearer ${globalToken}`);
});