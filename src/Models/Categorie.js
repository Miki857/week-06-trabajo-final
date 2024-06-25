const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Categories = sequelize.define('categorie', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Categories;