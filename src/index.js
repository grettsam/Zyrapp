const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");

// inicializaciones
const app = express();

//configuraciones
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));

//Se crea el motor
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs");

// Middleware
// Morgan (muestra información en la consola tiempo real)
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); // <-- solo permite datos como texto y no imagenes
app.use(express.json());

//Variables Globales
app.use((req, res, next) => {
  next();
});

// Rutas
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use(require("./routes/users"));
app.use("/home", require("./routes/home"));
app.use("/clients", require("./routes/clients"));
app.use("/guides", require("./routes/guides"));

// Publico
app.use(express.static(path.join(__dirname, "public")));

// Iniciar el servidor
app.listen(app.get("port"), () => {
  console.log("Servidor en el puerto", app.get("port"));
});
