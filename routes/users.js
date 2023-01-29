const express = require("express");
const router = express.Router();
const db = require("../config/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = "Cafe-Login";
const userModel = require('../models/userModel')

router.post("/register", (req, res) => {
  let user = userModel.findUserByUsername(req.body.u_username)
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
            res.status(400).json({ error: err });
          }else{
            res.status(200).json({ status: "ok" });
          }  
        }
      );
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
          let token = jwt.sign({ username: users[0].u_username }, secret,{ expiresIn: '1h' });
          res.json({status: 'ok', user: users[0] ,access_token: token})
        }else{
          res.status(400).json({ error: 'Invalid password' });
        }
      });
    }
  );
});

router.post('/authen',(req,res)=>{
  try{
    const token = req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token, secret);
    res.json({status: 'ok', decoded})
  }catch(err){
    res.json({status: 'error', message: err.message})
  }
})

module.exports = router;
