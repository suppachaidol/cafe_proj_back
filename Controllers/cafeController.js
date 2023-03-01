const db = require("../config/database");

const createCafe = async (req, res, next) => {
  await db.execute(
    "INSERT INTO cafe (c_name, c_detail, c_service, c_location, c_status, c_map, c_lat, c_lon) VALUES(?,?,?,?,?,?,?,?)",
    [
      req.body.c_name,
      req.body.c_detail,
      req.body.c_service,
      req.body.c_location,
      req.body.c_status,
      req.body.c_map,
      req.body.c_lat,
      req.body.c_lon,
    ],
    function (err, results, fields) {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json({ status: "ok", cafe_id: results.insertId });
      }
    }
  );
};

const uploadCafeImg = async (req, res, next) => {
  let image_url = req.file.filename;
  await db.execute(
    "INSERT INTO images (c_id,i_name,i_popular,i_menu_name,i_price) VALUES(?,?,?,?,?)",
    [
      req.body.c_id,
      image_url,
      req.body.i_popular,
      req.body.i_menu_name,
      req.body.i_price,
    ],
    function (err, results, fields) {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json({ status: "Successfully uploaded image." });
      }
    }
  );
};

const uploadMultiCafeImg = async (req, res) => {
  try {
    let cafe_img = req.files;
    for (let i in cafe_img) {
      image = cafe_img[i];
      await db.execute(`INSERT INTO images (c_id, i_name) VALUES(?,?)`, [
        req.body.c_id,
        image.filename,
      ]);
    }
    res.status(200).json({ status: "Successfully uploaded images." });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const uploadCafeProfile = async (req, res, next) => {
  let image_url = req.file.filename;
  await db.execute(
    "UPDATE cafe SET c_image=? WHERE c_id=?",
    [image_url, req.body.c_id],
    function (err, results, fields) {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json({ status: "Successfully uploaded image." });
      }
    }
  );
};

const getAllCafe = async (req, res, next) => {
  await db.execute(
    "SELECT * FROM cafe WHERE c_status='pass' ORDER BY c_star DESC",
    function (err, result_cafe) {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        db.execute("SELECT * FROM images", function (err, result_images) {
          if (err) {
            res.status(400).json({ error: err });
          } else {
            const newResultCafe = result_cafe.map((cafe) => {
              const image = result_images.filter(
                (img) => img.c_id === cafe.c_id
              );
              return { ...cafe, image };
            });
            res.status(200).json(newResultCafe);
          }
        });
      }
    }
  );
};


const getAllCafeByDate = async (req, res, next) => {
  await db.execute(
    "SELECT * FROM cafe WHERE c_status='pass' ORDER BY created_at DESC",
    function (err, result_cafe) {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        db.execute("SELECT * FROM images", function (err, result_images) {
          if (err) {
            res.status(400).json({ error: err });
          } else {
            const newResultCafe = result_cafe.map((cafe) => {
              const image = result_images.filter(
                (img) => img.c_id === cafe.c_id
              );
              return { ...cafe, image };
            });
            res.status(200).json(newResultCafe);
          }
        });
      }
    }
  );
};

const getAllNotpassCafeByDate = async (req, res, next) => {
  await db.execute(
    "SELECT * FROM cafe WHERE c_status='notpass' ORDER BY created_at DESC",
    function (err, result_cafe) {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        db.execute("SELECT * FROM images", function (err, result_images) {
          if (err) {
            res.status(400).json({ error: err });
          } else {
            const newResultCafe = result_cafe.map((cafe) => {
              const image = result_images.filter(
                (img) => img.c_id === cafe.c_id
              );
              return { ...cafe, image };
            });
            res.status(200).json(newResultCafe);
          }
        });
      }
    }
  );
};

const getCafeById = async (req, res, next) => {
  cafe_id = req.params.id;
  await db.execute(
    "SELECT * FROM cafe WHERE c_id=?",
    [cafe_id],
    function (err, result_cafe) {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        db.execute(
          "SELECT * FROM images WHERE c_id=?",
          [cafe_id],
          function (err, result_images) {
            if (err) {
              res.status(400).json({ error: err });
            } else {
              const newResultCafe = result_cafe.map((cafe) => {
                const image = result_images.filter(
                  (img) => img.c_id === cafe.c_id
                );
                return { ...cafe, result_img: image };
              });
              res.status(200).json(newResultCafe);
            }
          }
        );
      }
    }
  );
};

const getImageCafeById = async (req,res)=>{
  cafe_id = req.params.id;
  await db.execute(
    "SELECT * FROM images WHERE c_id=?",[cafe_id],
    function(err, images){
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json(images)
      }
    }
    
  )
}

const calculateStar = async (req,res)=>{
  let oldStar=req.body.oldStar
  let newStar=req.body.newStar
  let numReview=req.body.numReview
  let currentStar=0
  let c_id=req.body.c_id
  currentStar = ((oldStar*numReview)+newStar)/(numReview+1)
  currentStar = currentStar.toFixed(1)
  await db.execute(
    "UPDATE cafe SET c_star=?,c_review=? WHERE c_id=?",[currentStar,numReview+1,c_id],
    function(err, result){
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json({result})
      }
    }
    
  )
}

const updateStatus = async (req,res)=>{
  let c_id = req.body.c_id
  await db.execute(
    "UPDATE cafe SET c_status='pass' WHERE c_id=?",[c_id],
    function(err, result){
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json({result})
      }
    }  
  )
}

const removeCafe = async (req,res)=>{
  c_id = req.params.id;
  await db.execute(
    "DELETE FROM cafe WHERE c_id=?",[c_id],
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
  createCafe,
  uploadCafeImg,
  getAllCafe,
  getCafeById,
  uploadMultiCafeImg,
  uploadCafeProfile,
  getAllCafeByDate,
  getImageCafeById,
  calculateStar,
  getAllNotpassCafeByDate,
  updateStatus,
  removeCafe,
};
