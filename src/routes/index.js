const express = require('express');
const router = express.Router();

// colocar las rutas aquí
const routerUsers = require('./user.routers');
const routerPurchases = require('./purchase.routers');
const routerProductImg = require('./productimg.routers');
const routerProduct = require('./product.routers');
const routerCategories = require('./categorie.routers');
const routerCart = require('./cart.routers');

router.use('/users', routerUsers);
router.use('/purchases', routerPurchases);
router.use('/productimgs', routerProductImg);
router.use('/products', routerProduct);
router.use('/categories', routerCategories);
router.use('/carts', routerCart);

module.exports = router;