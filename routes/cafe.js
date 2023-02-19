const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require('multer')
const cafeController = require('../Controllers/cafeController')
const path = require('path')

const storage = multer.diskStorage({
    destination:'./resources/images/cafe',
    filename: (req,file,cb)=>{
        let fname = file.originalname.split('.')
        return cb(null,`${fname[0]}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

const uploadMultiple = multer({
    storage:storage
})

router.post("/cafe/create", auth, cafeController.createCafe)
router.post("/cafe/upload-img",auth,upload.single('i_name'),cafeController.uploadCafeImg)
router.post("/cafe/uploadmul-img",auth,uploadMultiple.array('i_name'),cafeController.uploadMultiCafeImg)
router.put("/cafe/upload_profile",auth,upload.single('c_image'),cafeController.uploadCafeProfile)
router.get("/cafe",cafeController.getAllCafe)
router.get("/cafe/:id",cafeController.getCafeById)
router.get("/cafe_date",cafeController.getAllCafeByDate)
router.get("/cafe_image/:id",cafeController.getImageCafeById)
router.put("/cafe/update_star",auth,cafeController.calculateStar)

module.exports = router