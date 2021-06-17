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

//*******            CREATE            ******/
//Metodo async para enviar la query para agregar un nuevo cliente.
router.post("/add", async (req, res) => {
  const { name_plant, category, pic_profile, pic_cover, text_guide } = req.body;
  const newGuide = {
    name_plant,
    category,
    pic_profile,
    pic_cover,
    text_guide
  };
  await pool.query(`INSERT INTO guides set ?`, [newGuide]);
  res.redirect("/guides");
});

module.exports = router;
