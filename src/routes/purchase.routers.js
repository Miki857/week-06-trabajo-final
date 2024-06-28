const { getAll, create, getOne, remove, update } = require('../controllers/purchase.controllers');
const express = require('express');
const {verifyJwt} = require('../utils/verifyJWT');

const routerPurchases = express.Router();

routerPurchases.route('/')
    .get(getAll)//PROTECTED
    .post(verifyJwt, create);//PROTECTED

routerPurchases.route('/:id')
    .get(verifyJwt, getOne)//PROTECTED

module.exports = routerPurchases;