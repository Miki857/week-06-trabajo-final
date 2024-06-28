const { getAll, create, getOne, remove, update } = require('../controllers/productimg.controllers');
const express = require('express');
const {verifyJwt} = require('../utils/verifyJWT');

const routerProtuctImgs = express.Router();

routerProtuctImgs.route('/')
    .get(getAll)//PROTECTED
    .post(verifyJwt, create);//PROTECTED

routerProtuctImgs.route('/:id')
    .get(verifyJwt, getOne)//PROTECTED
    .delete(verifyJwt, remove);//PROTECTED

module.exports = routerProtuctImgs;