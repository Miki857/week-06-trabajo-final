const { getAll, create, getOne, remove, update } = require('../controllers/categorie.controllers');
const express = require('express');
const {verifyJwt} = require('../utils/verifyJWT');

const routerCategories = express.Router();

routerCategories.route('/')
    .post(verifyJwt, create);//PROTECTED

routerCategories.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove)//PROTECTED

module.exports = routerCategories;