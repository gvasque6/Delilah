
const path = require("path");
const express = require("express");
const router = express.Router();

const { authCtrl, checkErrorMessages } = require(path.join(__dirname, 'controller', 'index'));

router.get("/",
    authCtrl.checkQueryParams,
    checkErrorMessages,
    authCtrl.getUser,
    authCtrl.getToken
);

module.exports = router;