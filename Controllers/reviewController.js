const db = require("../config/database");

const createReview = async (req, res) => {
  if(req.body.r_comment === null){
    await db.execute(
      "INSERT INTO reviews (u_id,c_id,r_star) VALUES(?,?,?)",
      [req.body.u_id, req.body.c_id, req.body.r_star],
      function (err, result) {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.status(200).json({ status: "ok"});
        }
      }
    );
  }else{
    await db.execute(
      "INSERT INTO reviews (u_id,c_id,r_comment,r_star) VALUES(?,?,?,?)",
      [req.body.u_id, req.body.c_id, req.body.r_comment, req.body.r_star],
      function (err, result) {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.status(200).json({ status: "ok"});
        }
      }
    );
  }
};
const getAllReview = async (req,res)=>{
  await db.execute(
      "SELECT * FROM reviews",
      function(err,result){
          if (err) {
              res.status(400).json({ error: err });
            } else {
              res.status(200).json(result);
            }
      }
  )
}

const getReviewByCafeId = async (req,res)=>{
    cafe_id = req.params.id
    await db.execute(
        "SELECT * FROM reviews LEFT JOIN users ON reviews.u_id = users.u_id WHERE reviews.c_id = ? ORDER BY r_date DESC",
        [
            cafe_id
        ],
        function(err,result){
            if (err) {
                res.status(400).json({ error: err });
              } else {
                res.status(200).json(result);
              }
        }
    )
}

module.exports = {
  createReview,
  getReviewByCafeId,
  getAllReview
};
