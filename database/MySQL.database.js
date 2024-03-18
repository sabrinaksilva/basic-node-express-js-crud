
const dbConfig = require("../config/db.config.js")
const Sequelize = require("sequelize");
const { Op } = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userModel = require("../models/User.model.js")(sequelize, Sequelize);
db.op = Op;

module.exports = db;