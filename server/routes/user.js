const express = require("express");
const router = express.Router({mergeParams: true})
const user = require("../controllers/user");
const {validateData} = require("../middleware");

router.get('/', user.userData);
router.put('/udhari_to_pay', validateData, user.udhariToPay);
router.put('/udhari_to_get', validateData, user.udhariToGet);
router.put('/manageUdhari', user.manageUdhari);
router.put('/removeUdhari', user.removeUdhari);

module.exports = router;