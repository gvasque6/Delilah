
const path = require("path");
const express = require("express");
const router = express.Router();

const { checkErrorMessages, dishesCtrl, authCtrl } = require(path.join(__dirname, "controller", "index"));


router.get("/",
    authCtrl.validateToken,
    dishesCtrl.getAllDishes
);

router.post("/",
    authCtrl.validateToken,
    authCtrl.adminAccessOnly,
    [
        dishesCtrl.checkBodyNewDish,
        checkErrorMessages
    ],
    dishesCtrl.createNewDish
);

router.get("/:id",
    authCtrl.validateToken,
    [
        dishesCtrl.checkParamDishId,
        checkErrorMessages
    ],
    dishesCtrl.getDish
);

router.put("/:id",
    authCtrl.validateToken,
    authCtrl.adminAccessOnly,
    [
        dishesCtrl.checkParamDishId,
        dishesCtrl.checkBodyUpdateDish,
        checkErrorMessages
    ],
    dishesCtrl.updateDish
);

router.delete("/:id",
    authCtrl.validateToken,
    authCtrl.adminAccessOnly,
    [
        dishesCtrl.checkParamDishId,
        checkErrorMessages
    ],
    dishesCtrl.deleteDish
);

module.exports = router;