const catchError = require('../utils/catchError');
const ProductImgs = require('../models/ProductImg');
const fs = require('fs');

const getAll = catchError(async(req, res) => {
    const results = await ProductImgs.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {filename} = req.file;
    const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`;
    const result = await ProductImgs.create({filename, url});
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductImgs.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);

    const imageFilePath = path.join(__dirname, '..', 'public', 'uploads', result.filename);
    fs.unlinkSync(imageFilePath);

    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove
}