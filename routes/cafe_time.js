const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const cafeTimeController = require("../Controllers/cafeTimeController")

router.post("/cafe_time/create",auth,cafeTimeController.createCafeTime)
router.get("/cafe_time/:id",cafeTimeController.getCafeTimeByCafeId)

module.exports = router