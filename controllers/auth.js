const { response } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({ ok: false, msg: "El correo ya existe" });
    }

    const usuario = new Usuario(req.body);
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();
    const token = await generarJWT(usuario.id);
    res.json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Error" });
  }
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
