const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purchases = sequelize.define('purchase', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Purchases;