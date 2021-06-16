const express = require("express");
const router = express.Router();
const pool = require("../database");

//*******            CREATE            ******/
//Metodo async para enviar la query para agregar un nuevo cliente.
router.post("/add", async (req, res) => {
  const { username, email, password, plan } = req.body;
  const newClient = {
    username,
    email,
    password,
    plan,
  };
  await pool.query(`INSERT INTO clients set ?`, [newClient]);
  res.redirect("/clients");
});

//*******            READ            ******/
//Metodo async para listar los clientes
router.get("/", async (req, res) => {
  const clientes = await pool.query("SELECT * FROM clients");
  res.render("clients/clientsList", { clientes });
});

//*******            DELETE            ******/
//Metodo async para eliminar los clientes por su id
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM clients WHERE clients_id = ?", [id]);
  res.redirect("/clients");
});

//*******            UPDATE INFO          ******/
//Metodo async para editar los clientes por su id
router.get("/edit/:id", async (req, res) => {
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
  res.redirect("/clients");
});

/**************************************************** */
//*******              UPDATE DATE               ******/

/****** 1 MONTH *******/
router.get("/editTime1/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(
    `UPDATE clients set end_plan = ADDDATE(end_plan, INTERVAL 1 MONTH) WHERE clients_id= ?`,
    [id]
  );
  res.redirect("/clients");
});
/****** 3 MONTH *******/
router.get("/editTime3/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(
    `UPDATE clients set end_plan = ADDDATE(end_plan, INTERVAL 3 MONTH) WHERE clients_id= ?`,
    [id]
  );
  res.redirect("/clients");
});
/****** 6 MONTH *******/
router.get("/editTime6/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(
    `UPDATE clients set end_plan = ADDDATE(end_plan, INTERVAL 6 MONTH) WHERE clients_id= ?`,
    [id]
  );
  res.redirect("/clients");
});
/****** 12 MONTH *******/
router.get("/editTime12/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(
    `UPDATE clients set end_plan = ADDDATE(end_plan, INTERVAL 12 MONTH) WHERE clients_id= ?`,
    [id]
  );
  res.redirect("/clients");
});

/**************************************************** */
//*******           UPDATE VISIBILITY            ******/

router.get("/visibility/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE clients set visibility = false WHERE clients_id= ?`, [
    id,
  ]);
  res.redirect("/clients");
});

router.get("/invisibility/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE clients set visibility = true WHERE clients_id= ?`, [
    id,
  ]);
  res.redirect("/clients");
});

module.exports = router;
