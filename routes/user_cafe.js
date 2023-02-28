const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userCafeController = require('../Controllers/userCafeController')

router.post("/user_cafe/create",auth,userCafeController.createFavorite)
router.post("/user_cafe/uc",userCafeController.getFavoriteByucId)
router.get("/user_cafe/u/:id",userCafeController.getFavoriteByUserId)
router.delete("/user_cafe/delete/:id",auth,userCafeController.removeFavorite)

module.exports = router