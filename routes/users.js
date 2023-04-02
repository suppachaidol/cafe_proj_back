const express = require("express");
const router = express.Router();
const db = require("../config/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = "Cafe-Login";
const multer = require('multer')
const path = require('path')
const { getDataByUsername } = require("../Controllers/userController");
const userController = require("../Controllers/userController");
// const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination:'./resources/images/profile',
  filename: (req,file,cb)=>{
      return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage
})

router.put("/user/upload-img",upload.single('u_image'),userController.uploadProfileImg)
router.post("/user/contact",userController.contactAdmin)

router.post("/register",(req, res) => {
  const username = req.body.u_username
  getDataByUsername(username, (error, results) => {
    if (error) throw error;
    if(results.length === 1){
      res.status(400).json({error: "This username already exists"})
    }else{
      bcrypt.hash(req.body.u_password, saltRounds, function (err, hash) {
        db.execute(
          "INSERT INTO users (u_name, u_username, u_password, u_email, u_phone) VALUES(?, ?, ?, ?, ?)",
          [
            req.body.u_name,
            req.body.u_username,
            hash,
            req.body.u_email,
            req.body.u_phone,
          ],
          function (err, results, fields) {
            if (err) {
              res.status(400).json({ error: "Register failed" });
            }else{
              res.status(200).json({ status: "ok", u_id: results.insertId});
            }  
          }
        );
      });
    }
  });
});

router.post("/login", (req, res) => {
  db.execute(
    "SELECT * FROM users WHERE u_username=?",
    [req.body.u_username], 
    function (err, users, fields) {
      //console.log(users)
      if (err) {
        res.json({ error: err });
        return;
      }
      if(users.length === 0){
        res.status(400).json({ error: 'Username not found' });
        return;
      }
      bcrypt.compare(req.body.u_password, users[0].u_password, function(err, isLogin) {
        //console.log(users)
        if(isLogin){
          let token = jwt.sign({ id:users[0].u_id, username: users[0].u_username }, secret,{ expiresIn: '8h' });
          res.json({status: 'ok', user: users[0] ,access_token: token})
        }else{
          res.status(400).json({ error: 'Invalid password' });
        }
      });
    }
  );
});

// router.get('/users',auth,(req,res)=>{
//   res.status(200).send("Welcome 🙌 ");
// })

// router.post('/authen',(req,res)=>{
//   try{
//     const token = req.headers.authorization.split(' ')[1]
//     var decoded = jwt.verify(token, secret);
//     res.json({status: 'ok', decoded})
//   }catch(err){
//     res.json({status: 'error', message: err.message})
//   }
// })

module.exports = router;
