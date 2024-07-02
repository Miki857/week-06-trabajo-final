const request = require('supertest');
const app = require('../app');
const BASE_URL = '/api/v1/purchases';

//LOCAL PURCHASE:
let purchaseId;

//LOCAL PRODUCT:
let productId;
const product = {
    title: "Product 1",
    description: "Description",
    categoryId: 1,//GLOBAL CATEGORY ID.
    price: 5
};

//LOCAL CART:
let cart;
let cartId;

//GLOBAL USER:
let globalToken;

beforeAll(async () => {
  //FIRST WE HAVE TO LOGIN A USER TO GET A TOKEN.
  const res = await request(app)
      .post(`/api/v1/users/login`)
      .send({email: "pepito@gmail.com", password: "pepito"});

  globalToken = res.body.token;

  //CREATE PRODUCT TO ADD TO CART:
  const resProduct = await request(app)
    .post("/api/v1/products")
    .send(product)
    .set('Authorization', `Bearer ${globalToken}`)

  productId = resProduct.body.id;

  //CREATE A CART TO ADD TO PURCHASE:
  cart = {
    productId: productId,
    quantity: 5
  }
  const resCart = await request(app)
    .post("/api/v1/carts")
    .send(cart)
    .set('Authorization', `Bearer ${globalToken}`)
  
    cartId = res.body.id;
});

//CREATE:
test("Post -> 'BASE_URL', should return status code 201 and res.body.length === 1", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .set('Authorization', `Bearer ${globalToken}`);

  purchaseId = res.body.id;
  console.log(res.body);

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.length).toBe(1);
});

// //GET USER PURCHASES:
// test("Get -> 'BASE_URL', should return status code 200 and res.body to have length = 1", async () => {
//     const res = await request(app)
//         .get(BASE_URL)
//         .set('Authorization', `Bearer ${globalToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toBeDefined();
//     expect(res.body).toHaveLength(1);
// })

// //DELETE:
// test("Delete -> 'BASE_URL/:id', should return status code 204 ", async () => {
//   const res = await request(app)
//     .delete(`${BASE_URL}/${purchaseId}`)
//     .set('Authorization', `Bearer ${userToken}`);

//   expect(res.status).toBe(204);
// });

afterAll(async () => {
  //DELETE LOCAL PRODUCT:
  await request(app)//BEFORE DELETE IT, CART MUST BE DELETE. PK RESTRICTIONS.
    .delete(`/api/v1/products/${productId}`)
    .set('Authorization', `Bearer ${globalToken}`);

  //DELETE LOCAL CART:
  await request(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set('Authorization', `Bearer ${globalToken}`);
});