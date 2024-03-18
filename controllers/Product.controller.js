
const db = require("../database/MySQL.database")
// const User = db.userModel

exports.create = (req, res) => {
    res.status(200).json("mock created ok")
};
