const { Router } = require("express");
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const router = Router();

router.post("/new", crearUsuario);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio")
      .not()
      .isEmpty()
  ],
  login
);

router.get("/renew", renewToken);

module.exports = router;
