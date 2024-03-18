
const express = require("express");
const db = require("./database/MySQL.database.js");


const app = express()
app.use(express.json());

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });



require("./routes/User.routes")(app);
require('./routes/Product.routes')(app);

app.use((req, resp, next) => {
    const error = new Error("Not found");
    error.status = 404
    next(error)
})


app.use((error, req, resp, next) => {
    resp.status(error.status || 500).json({
        message: error.message || 'Unexpected error'
    })
})



app.listen(8080, function () {
    console.log("Server is active on port 8080")
});