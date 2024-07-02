const catchError = require('../utils/catchError');
const Carts = require('../models/Cart');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const results = await Carts.findAll({where: {userId}});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id;
    const productId = req.body.productId;
    //Tengo que asegurarme de que el producto no exista con el mismo usuario. En dado caso debe hacerse un UPDATE en vez de un CREATE:
    const userCart = await Carts.findAll({where: {userId: userId}, raw: true});
    const checker = userCart.filter(el => el.productId == productId);
    if(checker.length > 0) return res.status(403).send({ message: 'Product already exist on cart.' })
    //IF THERE'S NO SUCH PRODUCT:
    const result = await Carts.create({...req.body, userId: userId});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await Carts.findByPk(id, {where: { userId }});
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
    const { id } = req.params;//FIELD ID.
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