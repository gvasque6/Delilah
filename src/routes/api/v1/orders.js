
const path = require("path");
const express = require("express");
const router = express.Router();

const { checkErrorMessages, ordersCtrl, authCtrl } = require(path.join(__dirname, "controller", "index"));

router.get("/",
    authCtrl.validateToken,
    authCtrl.adminAccessOnly,
    [
        ordersCtrl.checkQueryTimeFilters,
        checkErrorMessages
    ],
    ordersCtrl.getOrders
);


router.post("/",
    authCtrl.validateToken,
    [
        ordersCtrl.checkBodyNewOrder,
        checkErrorMessages
    ],
    ordersCtrl.createNewOrder
);

router.get("/:id",
    authCtrl.validateToken,
    [
        ordersCtrl.checkParamOrderId,
        ordersCtrl.checkOwnUserData,
        checkErrorMessages
    ],
    ordersCtrl.getOrder
);

router.put("/:id",
    authCtrl.validateToken,
    authCtrl.adminAccessOnly,
    [
        ordersCtrl.checkParamOrderId,
        ordersCtrl.checkQueryState,
        checkErrorMessages
    ],
    ordersCtrl.updateStatus
);

router.delete("/:id",
    authCtrl.validateToken,
    authCtrl.adminAccessOnly,
    [
        ordersCtrl.checkParamOrderId,
        checkErrorMessages
    ],
    ordersCtrl.deleteOrder
);

module.exports = router;