const { response, request } = require("express");
const fs = require("fs");
const path = require("path");
const { ExisteDigitacion } = require("../database/queries/Digitacion");
const { crearImagen } = require("../database/queries/digitacionimagenes");

//carga La Imagen Del COntrato
const CargarImagen = async (req = request, res = response) => {
  const { iddigitacion } = req.query;
  const archivo = req.file;
  let rutaFinal;
  try {
    const respuesta = await ExisteDigitacion(iddigitacion);
    if (respuesta.length === 0)
      return res.status(500).json({ msg: "No Existe La Digitacion" });
    if (!archivo) {
      return res.status(400).json({
        msg: "No se envió ninguna imagen",
      });
    }

    const nombreArchivo = archivo.originalname;
    const carpetaDestino = path.join(
      process.env.RUTAIMAGNES,
      respuesta[0].codigoafiliacion.toString()
    );
    rutaFinal = path.join(carpetaDestino, nombreArchivo);
    // Verificar si ya existe el archivo
    if (fs.existsSync(rutaFinal)) {
      return res.status(400).json({
        msg: "El archivo ya existe",
      });
    }

    // Crear la carpeta si no existe
    if (!fs.existsSync(carpetaDestino)) {
      fs.mkdirSync(carpetaDestino, { recursive: true });
    }
    fs.writeFileSync(rutaFinal, archivo.buffer);
    const fecha = new Date().toISOString().slice(0, 10);
  
    const data = [
      respuesta[0].nitempresa,
      respuesta[0].codigoafiliacion,
      fecha,
      rutaFinal,
      "AFW",
      "AFW",
      1,
      1,
    ];
    await crearImagen(data);
    return res.status(200).json({
      msg: "Imagen Cargada Con Exito",
    });
  } catch (error) {
    if (fs.existsSync(rutaFinal)) {
      fs.unlinkSync(rutaFinal);
      console.log("Archivo eliminado");
    }
    console.log("error :>> ", error);
    return res.status(500).json({
      msg: "se presento un error Al Montar La Imagen",
    });
  }
};

module.exports = {
  CargarImagen,
};
