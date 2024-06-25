const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductImgs = sequelize.define('productimg', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = ProductImgs;