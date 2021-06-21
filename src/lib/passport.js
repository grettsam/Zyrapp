const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("../lib/helpers");

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
        email,
        password,
      };
      newAdmin.password = await helpers.encriptador(password);

      const result = await pool.query("INSERT INTO admin SET ?", [newAdmin]);
      newAdmin.id = result.insertId;
      return done(null, newAdmin);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM admin WHERE admin_id = ?", [id]);
  console.log(" deserializeUser "+rows[0]);
  done(null, rows[0]);
});
