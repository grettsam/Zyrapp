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

    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const mimetype = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb("Error en el tipo de archivo");
      }
    },
  }).fields([
    { name: "pic_profile" },
    { name: "pic_cover" },
    { name: "pic_t_tierra" },
    { name: "pic_t_germinacion" },
    { name: "pic_t_sol" },
    { name: "pic_t_agua" },
    { name: "pic_t_consejo" },
    { name: "pic_t_enfermedad" },
    { name: "pic_t_plagas" },
  ])
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

router.post("/addGuide", async (req, res) => {
  const {
    name_plant,
    c_especie,
    c_reino,
    c_division,
    c_clase,
    c_orden,
    c_familia,
    c_genero,
    g_lugar,
    g_inicio,
    g_fin,
    g_tiempo,
    g_macetero,
    g_produndidad,
    g_distancia,
    t_tierra,
    t_germinacion,
    t_sol,
    t_agua,
    t_consejo,
    t_enfermedad,
    t_plagas,
  } = req.body;
  const newClient = {
    name_plant,
    pic_profile: `http://localhost:4000/upload/guides/${picGuide[0]}`,
    pic_cover: `http://localhost:4000/upload/guides/${picGuide[1]}`,
    c_especie,
    c_reino,
    c_division,
    c_clase,
    c_orden,
    c_familia,
    c_genero,
    g_lugar,
    g_inicio,
    g_fin,
    g_tiempo,
    g_macetero,
    g_produndidad,
    g_distancia,
    t_tierra,
    pic_t_tierra: `http://localhost:4000/upload/guides/${picGuide[2]}`,
    t_germinacion,
    pic_t_germinacion: `http://localhost:4000/upload/guides/${picGuide[3]}`,
    t_sol,
    pic_t_sol: `http://localhost:4000/upload/guides/${picGuide[4]}`,
    t_agua,
    pic_t_agua: `http://localhost:4000/upload/guides/${picGuide[5]}`,
    t_consejo,
    pic_t_consejo: `http://localhost:4000/upload/guides/${picGuide[6]}`,
    t_enfermedad,
    pic_t_enfermedad: `http://localhost:4000/upload/guides/${picGuide[7]}`,
    t_plagas,
    pic_t_plagas: `http://localhost:4000/upload/guides/${picGuide[8]}`,
  };
  await pool.query(`INSERT INTO guides set ?`, [newClient]);
  res.redirect("/guides");
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
  const guias = await pool.query("SELECT * FROM guides WHERE guides_id = ?", [
    id,
  ]);
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

// router.post("/addGuide", async (req, res) => {
//   const { name_plant, category, text_guide } = req.body;
//   const newGuide = {
//     name_plant,
//     category,
//     pic_profile: `http://localhost:4000/upload/guides/${picGuide[0]}`,
//     pic_cover: `http://localhost:4000/upload/guides/${picGuide[1]}`,
//     text_guide,
//   };
//   await pool.query(`INSERT INTO guides set ?`, [newGuide]);
//   res.redirect("/guides");
// });
