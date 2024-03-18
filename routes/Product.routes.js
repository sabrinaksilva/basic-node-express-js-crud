module.exports = app => {
    const productController = require("../controllers/Product.controller");
    var router = require("express").Router();

    router.post("/", productController.create);

    app.use('/api/products', router);

};