const { Router } = require("express");
const { crearUsuario, login, renewToken } = require("../controllers/auth");

const router = Router();

router.post("/new", crearUsuario);

router.post("/", login);

router.get("/renew", renewToken);

module.exports = router;
