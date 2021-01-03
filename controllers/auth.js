const { response } = require("express");
const { validationResult } = require("express-validator");

const crearUsuario = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Register"
  });
};

const login = async (req, res) => {
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
