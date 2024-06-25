const { getAll, create, getOne, remove, update } = require('../controllers/cart.controllers');
const express = require('express');

const routerCarts = express.Router();

routerCarts.route('/')
    .get(getAll)
    .post(create);

routerCarts.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerCarts;