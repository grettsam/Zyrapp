function show() {
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "zyrapp",
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("La conexion funciona");
  });

  connection.query("select * from clients", (err, rows) => {
    if (err) throw err;
    var clients = rows;
    console.log(clients);
  });
  connection.end();

//   var objetivo = document.getElementById("texto_nav1");
//   objetivo.innerHTML = clients;
}
show()