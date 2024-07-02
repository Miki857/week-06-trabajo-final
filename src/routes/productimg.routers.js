const { getAll, create, remove } = require('../controllers/productimg.controllers');
const express = require('express');
const {verifyJwt} = require('../utils/verifyJWT');
const upload = require('../utils/multer');

const routerProtuctImgs = express.Router();

routerProtuctImgs.route('/')
    .get(getAll)//PROTECTED
    .post(verifyJwt, upload.single('image'), create);//PROTECTED

routerProtuctImgs.route('/:id')
    .delete(verifyJwt, remove);//PROTECTED

module.exports = routerProtuctImgs;