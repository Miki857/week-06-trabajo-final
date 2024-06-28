const Carts = require("./Cart");
const Categories = require("./Categorie");
const ProductImgs = require("./ProductImg");
const Products = require("./Product");
const Purchases = require("./Purchase");
const User = require("./User");

User.hasMany(Products);
Products.hasMany(User);



// Products.belongsTo(Categories);

// ProductImgs.belongsTo(Products);

// Categories.belongsToMany(Products, {through: Purchases});
// Products.belongsToMany(Categories, {through: Purchases});
