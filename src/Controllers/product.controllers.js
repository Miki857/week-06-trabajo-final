const catchError = require('../utils/catchError');
const Products = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const results = await Products.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Products.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Products.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Products.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Products.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setImages = catchError(async(req, res) => {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    await product.setImages(req.body);
    const images = await product.getImages();
    if(!images) return res.sendStatus(404);
    return res.json(images);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setImages
}