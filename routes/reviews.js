const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const reviewController = require("../Controllers/reviewController")

router.post("/review/create",auth,reviewController.createReview)
router.get("/review/cafe/:id",reviewController.getReviewByCafeId)

module.exports = router