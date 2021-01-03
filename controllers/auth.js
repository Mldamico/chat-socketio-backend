const { response } = require("express");
const { validationResult } = require("express-validator");

const crearUsuario = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Register"
  });
};

const login = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ ok: false, errors: errores.mapped() });
  }
  const body = req.body;
  res.json({
    ok: true,
    msg: "Login"
  });
};

const renewToken = async (req, res) => {
  res.json({
    ok: true,
    msg: "renew"
  });
};

module.exports = { crearUsuario, login, renewToken };
