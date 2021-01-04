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
      ok: true,
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({ ok: false, msg: "No existe el usuario" });
    }
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res
        .status(404)
        .json({ ok: false, msg: "Password no es correcto." });
    }
    const token = await generarJWT(usuarioDB.id);
    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Error" });
  }
};

const renewToken = async (req, res) => {
  const uid = req.uid;
  console.log(uid);
  const token = await generarJWT(uid);

  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    token,
    usuario
  });
};

module.exports = { crearUsuario, login, renewToken };
