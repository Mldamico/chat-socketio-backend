const Mensaje = require("../models/mensaje");
const obtenerChat = async (req, res, next) => {
  const id = req.uid;
  const mensajesDe = req.params.de;
  const last30 = await Mensaje.find({
    $or: [
      { de: id, para: mensajesDe },
      { de: mensajesDe, para: id }
    ]
  })
    .sort({ createdAt: "asc" })
    .limit(30);

  res.json({
    ok: true,
    mensajes: last30
  });
};

module.exports = { obtenerChat };
