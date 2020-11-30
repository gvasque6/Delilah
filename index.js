
require('dotenv').config();                 
const path = require("path");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;     

app.use(express.json());

app.use(require(path.join(__dirname, "src", "middlewares", "logger.js")));


app.use(require(path.join(__dirname, "src", "routes", "routes.js")));

app.all("*", (req, res) => res.sendStatus(404));


app.use((err, req, res, next) => {
    if (!err) return next();
    console.log("An error has occurred", err);
    res.status(500).json(err.message);
    throw err;
});


const { sequelize } = require(path.join(__dirname, 'src', 'services', 'database', 'index'));
sequelize.authenticate()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`${new Date().toLocaleString()} -- Server is up and listening to port ${PORT}`)
        });
    })
    .catch(error => {
        console.error("Error authenticating DB", error);
    });