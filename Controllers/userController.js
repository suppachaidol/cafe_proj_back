const db = require("../config/database");

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
module.exports = {
    getDataByUsername,
    uploadProfileImg
};