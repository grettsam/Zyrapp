const express = require("express");
const router = express.Router();
const pool = require("../database");

//*******            READ            ******/
//Metodo async para listar los clientes
// router.get("/", async (req, res) => {
//   res.render("guides/guideList");
// });

router.get("/", async (req, res) => {
    const guides = await pool.query("SELECT * FROM guides");
    res.render("guides/guideList", { guides });
  });




module.exports = router;
