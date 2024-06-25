const { getAll, create, getOne, remove, update, logged, login } = require('../controllers/user.controllers');
const express = require('express');
const {verifyJwt} = require('../utils/verifyJWT');

const routerUsers = express.Router();

routerUsers.route('/')
    .get(getAll)//PROTECTED
    .post(create);

routerUsers.route('/login')
    .post(login);

routerUsers.route('/me')
    .get(verifyJwt, logged);//PROTECTED

routerUsers.route('/:id')
    .get(verifyJwt, getOne)//PROTECTED
    .delete(verifyJwt, remove)//PROTECTED
    .put(verifyJwt, update);//PROTECTED

module.exports = routerUsers;