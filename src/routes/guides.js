const express = require("express");
const router = express.Router();
const pool = require("../database");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

var picGuide = [];
// Configuracion de Multer
const storage = multer.diskStorage({
  // destination: path.join(__dirname, "../public/upload/guides"),
  destination: path.join(__dirname, "../public/upload/guides"),
  filename: (req, file, cb) => {
    cb(
      null,
      uuidv4() + path.extname(file.originalname).toLocaleLowerCase()
    );


    picGuide.push(
      uuidv4() + path.extname(file.originalname).toLocaleLowerCase()
    );
  },
});

// Multer (Subir imagenes)
router.use(
  multer({
    storage,
    dest: path.join(__dirname, "../public/upload/guides"),
    limits: { fileSize: 10000000 }, //10MB
  }).fields([{ name: "pic_profile" }, { name: "pic_cover" }])
);

//*******            READ            ******/
//Metodo async para listar los guias
router.get("/", async (req, res) => {
  const guides = await pool.query("SELECT * FROM guides");
  res.render("guides/guideList", { guides });
});

//*******            CREATE            ******/
//Metodo async para enviar la query para agregar un nuevo cliente.
router.post("/addGuide", async (req, res) => {
  const { name_plant, category, text_guide } = req.body;
  console.log(picGuide);
  console.log(req.body);
  const newGuide = {
    name_plant,
    category,
    pic_profile: `http://localhost:4000/upload/guides/${picGuide[0]}`,
    pic_cover: `http://localhost:4000/upload/guides/${picGuide[1]}`,
    text_guide,
  };
  console.log(newGuide);
  console.log(storage.getFilename());
  await pool.query(`INSERT INTO guides set ?`, [newGuide]);
  res.redirect("/guides");
});

module.exports = router;

//Filtro de tipo de

// fileFilter: (req, file, cb) => {
//   const filetypes = /jpeg/;
//   const minetype = filetypes.test(filetypes.minetype);
//   const extname = filetypes.test(path.extname(file.originalname));
//   if (minetype && extname) {
//     return cb(null, true);
//   }
//   cb("Error: El archivo debe ser una imagen valida");
//   console.log(file);
// },
