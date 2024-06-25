const Carts = require("./Cart");
const Categories = require("./Categorie");
const ProductImgs = require("./ProductImg");
const Products = require("./Product");
const Purchases = require("./Purchase");
const User = require("./User");

User.belongsToMany(Products, {through: Carts});
Products.belongsToMany(User, {through: Carts});
