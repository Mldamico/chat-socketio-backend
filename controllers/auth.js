const { response } = require("express");

const crearUsuario = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Register"
  });
};

const login = async (req, res) => {
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
