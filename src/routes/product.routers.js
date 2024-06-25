const { getAll, create, getOne, remove, update } = require('../controllers/product.controllers');
const express = require('express');

const routerProducts = express.Router();

routerProducts.route('/')
    .get(getAll)
    .post(create);

routerProducts.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerProducts;