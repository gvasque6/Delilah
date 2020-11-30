
const path = require("path");
const express = require("express");
const router = express.Router();

const { checkErrorMessages, usersCtrl, authCtrl } = require(path.join(__dirname, "controller", "index"));


router.get("/",
    authCtrl.validateToken,
    authCtrl.adminAccessOnly,
    usersCtrl.getAllUsers
);

router.post("/",
    [
        usersCtrl.checkBodyNewUser,
        checkErrorMessages
    ],
    usersCtrl.createNewUser
);

router.get("/:id",
    authCtrl.validateToken,
    [
        usersCtrl.checkParamIdUser,
        usersCtrl.checkOwnUserData,
        checkErrorMessages
    ],
    usersCtrl.getOneUser
);

router.put("/:id",
    authCtrl.validateToken,
    [
        usersCtrl.checkParamIdUser,
        usersCtrl.checkOwnUserData,
        usersCtrl.checkBodyUpdateUser,
        checkErrorMessages
    ],
    usersCtrl.updateUser
);

router.delete("/:id",
    authCtrl.validateToken,
    authCtrl.adminAccessOnly,
    [
        usersCtrl.checkParamIdUser,
        checkErrorMessages
    ],
    usersCtrl.deleteUser
);

router.get("/:id/dishes",
    authCtrl.validateToken,
    [
        usersCtrl.checkParamIdUser,
        usersCtrl.checkOwnUserData,
        checkErrorMessages
    ],
    usersCtrl.getFavouriteDishes
);


module.exports = router;