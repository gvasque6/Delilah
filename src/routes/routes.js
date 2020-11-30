
const path = require("path");
const express = require("express");
const router = express.Router();


const url_routes_v1 = "/api/v1";
const path_routes_v1 = path.join(__dirname, "api", "v1");


router.use(url_routes_v1 + "/dishes",
    require(path.join(path_routes_v1, "dishes.js")));

router.use(url_routes_v1 + "/login",
    require(path.join(path_routes_v1, "login.js")));


router.use(url_routes_v1 + "/orders",
    require(path.join(path_routes_v1, "orders.js")));


router.use(url_routes_v1 + "/users",
    require(path.join(path_routes_v1, "users.js")));

    
module.exports = router;