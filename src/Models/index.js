const Carts = require("./Cart");
const Categories = require("./Categorie");
const ProductImg = require("./ProductImg");
const Products = require("./Product");
const Purchases = require("./Purchase");
const User = require("./User");

//Product -> categoryId
Products.belongsTo(Categories);
Categories.hasMany(Products);

//Cart -> userId
Carts.belongsTo(User);
User.hasMany(Carts);

//Cart -> productId
Carts.belongsTo(Products);
Products.hasMany(Carts);

//Purchase -> userId
Purchases.belongsTo(User);
User.hasMany(Purchases);

//Purchase -> productId
Purchases.belongsTo(Products);
Products.hasMany(Purchases);

//ProductImg -> productId
ProductImg.belongsTo(Products);
Products.hasMany(ProductImg);