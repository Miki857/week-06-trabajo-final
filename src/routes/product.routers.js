const { getAll, create, getOne, remove, update, setImages } = require('../controllers/product.controllers');
const express = require('express');

const routerProducts = express.Router();

routerProducts.route('/')
    .get(getAll)
    .post(create);//PROTECTED

routerProducts.route('/:id/images')
    .post(setImages)//PROTECTED

routerProducts.route('/:id')
    .get(getOne)//PROTECTED
    .delete(remove)
    .put(update);//PROTECTED

module.exports = routerProducts;