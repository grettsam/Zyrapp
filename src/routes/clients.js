const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/add", (req, res) => {
  res.render("clients/add");
});

//Metodo async para enviar la query para agregar un nuevo cliente.
router.post("/add", async (req, res) => {
  const { username, email, password, plan, type_accounts } = req.body;
  const newClient = {
    username,
    email,
    password,
    plan,
    type_accounts,
  };
  await pool.query(`INSERT INTO clients set ?`, [newClient]);
  res.redirect("/clients");
});

//Metodo async para listar los clientes
router.get("/", async (req, res) => {
  const clientes = await pool.query("SELECT * FROM clients");
  res.render("clients/clientsList", { clientes });
});

//Metodo async para eliminar los clientes por su id
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM clients WHERE clients_id = ?", [id]);
  res.redirect("/clients");
});

//Metodo async para editar los clientes por su id
router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const clientes = await pool.query(
    "SELECT * FROM clients WHERE clients_id = ?",
    [id]
  );
  // console.log(clientes[0]);
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

module.exports = router;

// <th scope="col">#</th>
// <th scope="col">Username</th>
// <th scope="col">Email</th>
// <th scope="col">Password</th>
// <th scope="col">Plan</th>
// <th scope="col">Cuenta</th>
// <th scope="col">Start Plan</th>
// <th scope="col">End Plan</th>
// <th scope="col">Admin</th>
