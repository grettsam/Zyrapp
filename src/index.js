const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const mysqlStore = require("express-mysql-session");
const session = require("express-session");
const passport = require("passport");

const { database } = require("./keys");
// inicializaciones
const app = express();
require("./lib/passport");

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
app.use(
  session({
    secret: "Zyrapp Session",
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database),
  })
);
// Connect-Flash (muestra mensajes al usuario)
app.use(flash());
// Morgan (muestra información en la consola tiempo real)
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); // <-- solo permite datos como texto y no imagenes
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//Variables Globales
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
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
