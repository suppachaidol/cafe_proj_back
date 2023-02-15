const db = require("../config/database");

const createReview = async (req, res) => {
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
};

const getReviewByCafeId = async (req,res)=>{
    cafe_id = req.params.id
    await db.execute(
        "SELECT * FROM reviews WHERE c_id=? ORDER BY r_date DESC",
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
  getReviewByCafeId
};
