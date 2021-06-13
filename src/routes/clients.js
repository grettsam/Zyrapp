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
    type_accounts
  };
  await pool.query(`INSERT INTO clients set ?`, [newClient]);
  res.send("Resivido");
});

module.exports = router;
