const e = require("express");
const { response, request } = require("express");
const { jsbn } = require("node-forge");
const {
  insertarDigitacion,
  insertarDigitacionBeneficiario,
  ExisteDigitacion,
  EliminarBeneficiario,
} = require("../database/queries/Digitacion");
const ordenColumnas = [
  "NOMBRES",
  "APELLIDOS",
  "IDPARENTESCO",
  "EDAD",
  "USUARIO",
  "PROCESADO",
  "NITEMPRESA",
  "ADICIONAL",
  "VALORADICIONAL",
];

//crear Digitacion
const crearDigitacion = async (req = request, res = response) => {
  const data = req.body;

  try {
    const respuesta = await insertarDigitacion(data);
    let arrayDeArrays;
    if (!respuesta.msg & data.benefeci) {
      if (data.benefeci.length > 0) {
        arrayDeArrays = data.benefeci.map((obj) => [
          ...ordenColumnas.map((col) => obj[col]),
          respuesta.IDDIGITACION,
          respuesta.CODIGOAFILIACION,
        ]);
        await insertarDigitacionBeneficiario(arrayDeArrays);
      }
    }

    return res.status(200).json({
      respuesta: {
        ...respuesta,
        msg: "Afiliacion Creada",
      },
    });
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({
      msg: error,
    });
  }

  //}
};

//Crear Beneficiario En Digitacion
const crearDigitacionBenefi = async (req = request, res = response) => {
  const { Codigoafiliacion, beneficiarios } = req.body;
  try {
    const respuesta = await ExisteDigitacion(Codigoafiliacion);

    if (respuesta.length > 0) {
      arrayDeArrays = beneficiarios.map((obj) => [
        ...ordenColumnas.map((col) => obj[col]),
        respuesta[0].iddigitacion,
        respuesta[0].codigoafiliacion,
      ]);
      const idBenefi = await insertarDigitacionBeneficiario(arrayDeArrays);
      return res.status(200).json({
        msg: "Beneficiario Creados",
        cedulas: idBenefi,
      });
    }
    return res.status(400).json({
      msg: "No Se Encuentra La Afiliacion " + Codigoafiliacion,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Se Presento Un Error Al Crear EL Beneficiario",
      msg2: error,
    });
  }
};

//eliminar un beneficiario de la digitacion

const eliminarBenefi = async (req = request, res = response) => {
  const { Codigoafiliacion, Cedula } = req.query;

  const exit = await ExisteDigitacion(Codigoafiliacion);

  if (exit.length <= 0) {
    return res.status(400).json({
      msg: "No Se Encuentra La Afiliacion " + Codigoafiliacion,
    });
  }

  if (!Codigoafiliacion || !Cedula) {
    return res.status(400).json({
      msg: "Envie El Codigo De Afiliacion O La Cedula Del Beneficiario A Eliminar",
    });
  }
  const datos = [Codigoafiliacion, Cedula];

  const respuesta = await EliminarBeneficiario(datos);

  if (respuesta) {
    return res.status(200).json({
      msg: "Beneficiario Eliminado",
    });
  }

  try {
  } catch (error) {
    return res.status(500).json({
      msg: "Error Al Eliminar EL beneficiario",
      msg2: error,
    });
  }
};
module.exports = { crearDigitacion, crearDigitacionBenefi, eliminarBenefi };
