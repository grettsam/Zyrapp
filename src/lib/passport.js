const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("../lib/helpers");


/*********************Login**********************************/
passport.use(
  "local.loginAdmin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * FROM admin WHERE username = ?", [
        username,
      ]);
      console.log(rows[0]);
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.desencriptador(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash("success", "Bienvenido/a " + user.username));
        } else {
          done(null, false, req.flash("message", "Contraseña incorrecta"));
        }
      } else {
        done(null, false, req.flash("message", "Usuario no encontrado"));
      }
    }
  )
);

/*********************SingUp**********************************/
passport.use(
  "local.signupAdmin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { email } = req.body;
      const newAdmin = {
        username,
        password,
        email,
      };
      newAdmin.password = await helpers.encriptador(password);

      const result = await pool.query("INSERT INTO admin SET ?", [newAdmin]);
      newAdmin.id = result.insertId;
      return done(null, newAdmin, req.flash("success", "Nuevo usuario creado"));
    }
  )
);

// passport.serializeUser((user, done) => {
//   done(null, user.admin_id);
// });

// passport.deserializeUser(async (user, done) => {
//   console.log(user);
//   const rows = await pool.query("SELECT * FROM admin WHERE admin_id = ? ", [user.admin_id]);
//   done(null, rows[0]);
// });

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  
  done(null, user);
});
