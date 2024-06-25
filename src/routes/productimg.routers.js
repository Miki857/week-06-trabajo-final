const { getAll, create, getOne, remove, update } = require('../controllers/productimg.controllers');
const express = require('express');

const routerProtuctImgs = express.Router();

routerProtuctImgs.route('/')
    .get(getAll)
    .post(create);

routerProtuctImgs.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerProtuctImgs;