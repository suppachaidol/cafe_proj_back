const db = require("../config/database");
const nodeMailer = require('nodemailer');
function getDataByUsername(username, cb) {
    db.query("SELECT * FROM users WHERE u_username = ?", [username], (error, results) => {
      if (error) return cb(error);
      cb(null, results);
    });
}

const uploadProfileImg = async (req,res)=>{
  let image_url = req.file.filename
  await db.execute(
      "UPDATE users SET u_image=? WHERE u_id=?",
      [
        image_url,
        req.body.u_id,
      ],
      function (err, results, fields) {
          if (err) {
            res.status(400).json({ error: err });
          }else{
            res.status(200).json({ status: "Successfully uploaded image.",});
          }  
        }
  )
}

let transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'cafehopper.ku@gmail.com',
      pass: 'qjlwrvyzskgpywlk'
  }
});

const contactAdmin = async (req,res)=>{
  
  let mailOptions = {
    from: 'cafehopper.ku@gmail.com',
    to: 'cafehopper.ku@gmail.com',
    subject: req.body.subject,
    text: `User: ${req.body.firstname} ${req.body.lastname}\nEmail: ${req.body.email}\n\n${req.body.detail}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).json({ error: error });
      console.log(error);
    } else {
      res.status(200).json({ status: "OK"});
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
    getDataByUsername,
    uploadProfileImg,
    contactAdmin,
};