const catchError = require('../utils/catchError');
const Purchases = require('../models/Purchase');
const Carts = require('../Models/Cart');
const User = require('../models/User');
const Products = require('../Models/Product');

const create = catchError(async(req, res) => {
    const userId = req.user.id;
    const cart = await Carts.findAll({//GET ALL PRODUCTS FROM USER CART.
        where: {userId},
        raw: true
    })
    if(!cart) return res.sendStatus(400);
    const result = await Purchases.bulkCreate(cart);
    //DELETE CART:
    await Carts.destroy({where: {userId}});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchases.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

module.exports = {
    create,
    getOne
}