const { getAll, create, getOne, remove, update } = require('../controllers/categorie.controllers');
const express = require('express');

const routerCategories = express.Router();

routerCategories.route('/')
    .get(getAll)
    .post(create);

routerCategories.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerCategories;