const db = require("../config/database");

const createFavorite = async (req, res, next) => {
    await db.execute(
      "INSERT INTO user_cafe (u_id, c_id) VALUES(?,?)",
      [
        req.body.u_id,
        req.body.c_id,
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
  const getFavoriteByucId = async (req,res)=>{
    await db.execute(
      "SELECT * FROM user_cafe WHERE u_id=? AND c_id=?",[req.body.u_id,req.body.c_id],
      function(err, user_cafe){
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.status(200).json(user_cafe)
        }
      }
    )
  }
  const getFavoriteByUserId = async (req,res)=>{
    user_id = req.params.id;
    await db.execute(
      "SELECT * FROM user_cafe LEFT JOIN cafe ON user_cafe.c_id = cafe.c_id WHERE u_id=? ORDER BY uc_created_at DESC",[user_id],
      function(err, user_cafe){
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.status(200).json(user_cafe)
        }
      }
    )
  }
  const removeFavorite = async (req,res)=>{
    uc_id = req.params.id;
    await db.execute(
      "DELETE FROM user_cafe WHERE uc_id=?",[uc_id],
      function(err, user_cafe,fields){
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.status(200).json({ status: "ok"})
        }
      }
    )
  }

  module.exports = {
    createFavorite,
    getFavoriteByucId,
    removeFavorite,
    getFavoriteByUserId,
  };