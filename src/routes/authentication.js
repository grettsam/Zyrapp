const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoginIn, isNotLoginIn } = require("../lib/auth");

/*********** SingUp ************/
router.get("/signup", isNotLoginIn,(req, res) => {
  res.render("auth/signup");
});

router.post(
  "/signup",
  passport.authenticate("local.signupAdmin", {
    successRedirect: "/login",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

/*********** Login ************/
router.get("/login", isNotLoginIn, (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local.loginAdmin", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

/*********** Profile ************/

router.get("/profile", isLoginIn, (req, res) => {
  res.render("profile");
});

/*********** LogOut ************/

router.get("/logout", isLoginIn, (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
