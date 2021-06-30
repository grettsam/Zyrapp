const express = require("express");
const router = express.Router();
const pool = require("../database");
const path = require("path");
const multer = require("multer");
const helpers = require("../lib/helpers")
const { isLoginIn } = require("../lib/auth");

var picCliente = [];

// Configuracion de Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/upload/guides"),
  filename: (req, file, cb) => {
    const { username } = req.body;
    cb(
      null,
      username.replace(/\s+/g, "_") +
        "--" +
        file.originalname.toLocaleLowerCase().replace(/\s+/g, "")
    );
    picCliente.push(
      username.replace(/\s+/g, "_") +
        "--" +
        file.originalname.toLocaleLowerCase().replace(/\s+/g, "")
    );
  },
});

// Multer (Subir imagenes)
router.use(
  multer({
    storage,
    dest: path.join(__dirname, "../public/upload/clientes"),
    limits: { fileSize: 2000000 }, //2MB

    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif|JPEG|JPG|PNG|GIF/;
      const mimetype = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb("Error en el tipo de archivo");
      }
    },
  }).fields([{ name: "pic_perfil" }])
);

//*******            READ            ******/
//Metodo async para listar los clientes
router.get("/", isLoginIn, async (req, res) => {

  const clientes = await pool.query("SELECT clients.*, admin.username AS adminUsername FROM clients INNER JOIN admin ON clients.admin_id = admin.admin_id WHERE clients.admin_id=1", [req.user.admin_id]);
  res.render("clients/clientsList", { clientes });
});

//*******            CREATE            ******/
//Metodo async para enviar la query para agregar un nuevo cliente.
router.post("/add", async (req, res) => {
  const {
    username,
    email,
    password,
    plan,
    banco,
    telefono,
    region,
    comuna,
    direccion,
  } = req.body;
  const newClient = {
    username,
    email,
    password,
    plan,
    banco,
    telefono,
    region,
    comuna,
    direccion,
    pic_perfil: `http://localhost:4000/upload/cliente/${picCliente[0]}`,
    admin_id: req.user.admin_id,
  };

  newClient.password = await helpers.encriptador(password); // encriptar cuenta del cliente
  await pool.query(`INSERT INTO clients set ?`, [newClient]);
  req.flash("success", "Cliente creado correctamente");
  res.redirect("/clients");
});

//*******            DELETE            ******/
//Metodo async para eliminar los clientes por su id
router.get("/delete/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM clients WHERE clients_id = ?", [id]);
  req.flash("success", "Cliente eliminado correctamente");
  res.redirect("/clients");
});

//*******            UPDATE INFO          ******/
//Metodo async para editar los clientes por su id
router.get("/edit/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  const clientes = await pool.query(
    "SELECT * FROM clients WHERE clients_id = ?",
    [id]
  );
  res.render("clients/edit", { cliente: clientes[0] });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password, plan } = req.body;
  const newClient = {
    username,
    email,
    password,
    plan,
  };
  await pool.query(`UPDATE clients set ? WHERE clients_id= ?`, [newClient, id]);
  req.flash("success", "Cliente editado correctamente");
  res.redirect("/clients");
});

/**************************************************** */
//*******              UPDATE DATE               ******/

/****** 1 MONTH *******/
router.get("/editTime1/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query(
    `UPDATE clients set end_plan = ADDDATE(end_plan, INTERVAL 1 MONTH) WHERE clients_id= ?`,
    [id]
  );
  req.flash("success", "Cliente suscrito por 1 Mes");
  res.redirect("/clients");
});
/****** 3 MONTH *******/
router.get("/editTime3/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query(
    `UPDATE clients set end_plan = ADDDATE(end_plan, INTERVAL 3 MONTH) WHERE clients_id= ?`,
    [id]
  );
  req.flash("success", "Cliente suscrito por 3 Meses");
  res.redirect("/clients");
});
/****** 6 MONTH *******/
router.get("/editTime6/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query(
    `UPDATE clients set end_plan = ADDDATE(end_plan, INTERVAL 6 MONTH) WHERE clients_id= ?`,
    [id]
  );
  req.flash("success", "Cliente suscrito por 6 Meses");
  res.redirect("/clients");
});
/****** 12 MONTH *******/
router.get("/editTime12/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query(
    `UPDATE clients set end_plan = ADDDATE(end_plan, INTERVAL 12 MONTH) WHERE clients_id= ?`,
    [id]
  );
  req.flash("success", "Cliente suscrito por 12 Meses");
  res.redirect("/clients");
});

/**************************************************** */
//*******           UPDATE VISIBILITY            ******/

router.get("/visibility/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query(
    `UPDATE clients set visibility = false WHERE clients_id= ?`,
    [id]
  );
  req.flash("success", " El cliente no esta visible");
  res.redirect("/clients");
});

router.get("/invisibility/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE clients set visibility = true WHERE clients_id= ?`, [
    id,
  ]);
  req.flash("success", "El cliente esta visible");
  res.redirect("/clients");
});

module.exports = router;
