const db = require("../config/database");

const createCafeTime = async (req, res, next) => {
    await db.execute(
      "INSERT INTO cafe_time (c_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES(?,?,?,?,?,?,?,?)",
      [
        req.body.c_id,
        req.body.monday,
        req.body.tuesday,
        req.body.wednesday,
        req.body.thursday,
        req.body.friday,
        req.body.saturday,
        req.body.sunday,
      ],
      function (err, results, fields) {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.status(200).json({ status: "ok"});
        }
      }
    );
  };

const getCafeTimeByCafeId = async (req,res)=>{
    cafe_id = req.params.id
    await db.execute(
        "SELECT * FROM cafe_time WHERE c_id=?",
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
    createCafeTime,
    getCafeTimeByCafeId
  };