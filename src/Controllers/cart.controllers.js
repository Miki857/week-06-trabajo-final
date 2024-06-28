const catchError = require('../utils/catchError');
const Carts = require('../models/Cart');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const results = await Carts.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id;
    const result = await Carts.create({...req.body, userId: userId});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Carts.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Carts.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    delete req.body.userId;
    delete req.body.productId;
    const result = await Carts.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}