const express = require("express");
const router = express.Router();
const pool = require("../database");
const path = require("path");
const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");

var picGuide = [];

// Configuracion de Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/upload/guides"),
  filename: (req, file, cb) => {
    const { name_plant } = req.body;
    cb(
      null,
      name_plant.replace(/\s+/g, "_") +
        "--" +
        file.originalname.toLocaleLowerCase().replace(/\s+/g, "")
    );
    picGuide.push(
      name_plant.replace(/\s+/g, "_") +
        "--" +
        file.originalname.toLocaleLowerCase().replace(/\s+/g, "")
    );
  },
});

// Multer (Subir imagenes)
router.use(
  multer({
    storage,
    dest: path.join(__dirname, "../public/upload/guides"),
    limits: { fileSize: 10000000 }, //10MB

    fileFilter: (req,  file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const mimetype = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb("Error en el tipo de archivo");
      }
    },
  }).fields([{ name: "pic_profile" }, { name: "pic_cover" }])
);

//*******            READ            ******/
//Metodo async para listar los guias
router.get("/", async (req, res) => {
  const guides = await pool.query("SELECT * FROM guides");
  res.render("guides/guideList", { guides });
});

//*******            CREATE            ******/
//Metodo async para enviar la query para agregar una nueva guia.
router.get("/addGuide", async (req, res) => {
  res.render("guides/addGuide");
});








//*******            DELETE            ******/
//Metodo async para eliminar las guias por su id
router.get("/deleteGuides/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM guides WHERE guides_id = ?", [id]);
  res.redirect("/guides");
});

//*******            UPDATE INFO          ******/
//Metodo async para editar las guias por su id
router.get("/editGuides/:id", async (req, res) => {
  const { id } = req.params;
  const guias = await pool.query(
    "SELECT * FROM guides WHERE guides_id = ?",
    [id]
  );
  res.render("clients/edit", { guia: guias[0] });
});

router.post("/editGuides/:id", async (req, res) => {
  const { id } = req.params;
  //  Arregaglar lo de abajo
  const { username, email, password, plan } = req.body;
  const newClient = {
    username,
    email,
    password,
    plan,
  };
  // 
  await pool.query(`UPDATE guides set ? WHERE clients_id= ?`, [newClient, id]);
  res.redirect("/clients");
});
















module.exports = router;
