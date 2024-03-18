module.exports = app => {
    const usersController = require("../controllers/User.controller.js");
    var router = require("express").Router();

    router.post("/", usersController.create);
    router.get("/", usersController.findAll);


    app.use('/api/users', router);

};