const { getAll, create, getOne, remove, update } = require('../controllers/cart.controllers');
const express = require('express');
const {verifyJwt} = require('../utils/verifyJWT');

const routerCarts = express.Router();

routerCarts.route('/')
    .get(verifyJwt, getAll)//PROTECTED
    .post(verifyJwt, create);//PROTECTED

routerCarts.route('/:id')
    .get(verifyJwt, getOne)//PROTECTED
    .delete(verifyJwt, remove)//PROTECTED
    .put(verifyJwt, update);//PROTECTED

module.exports = routerCarts;