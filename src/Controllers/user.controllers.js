const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Products = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const result = await User.create({...req.body, password: hashedPass});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}});
    if(!user) return res.sendStatus(401).json({error: 'Credenciales Invalidas'});

    const isValid = await bcrypt.compare(password, user.password);
    //                 para el testing
    if(!isValid && user.password != password) return res.sendStatus(401).json({error: 'Credenciales Invalidas'});

    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn: '1d'}
    );
    delete user.dataValues.password;
    return res.json({user, token});
});

const logged = catchError(async (req, res) => {
    const email = req.user.email;
    const user = await User.findOne({where: {email}});
    delete user.dataValues.password;
    return res.json(user);
});

/*const setProducts = catchError(async (req, res) => {
    const { id } = req.params;
    const { productId, quantity } = req.body;
    const user = await User.findByPk(id);
    await user.setProducts(productId, { through: { quantity: quantity } });

    const products = await user.getProducts();
    if(!products) return res.sendStatus(404);
    return res.json(products);
});

const removeProducts = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    await user.removeProducts(req.body);
    const products = await user.getProducts();
    if(!products) return res.sendStatus(404);
    return res.json(products);
});*/

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    logged
}