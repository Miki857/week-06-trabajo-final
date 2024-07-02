const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Categories = require('./Categorie');

const Products = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categories,
            key: 'id'
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Products;