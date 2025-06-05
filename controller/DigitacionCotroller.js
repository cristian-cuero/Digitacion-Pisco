const { response, request, json } = require("express");
const {
  insertarDigitacion,
  insertarDigitacionBeneficiario,
  ExisteDigitacion,
  EliminarBeneficiario,
  BuscarContratos,
  BuscarBenefeciarios,
  editarDigitacionQuery,
} = require("../database/queries/Digitacion");
const { Contrato } = require("../model/Contrato");
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

const ordenColumnasDigitacion = [
  "FECHAAFILIACION",
  "CODIGOAFILIACION",
  "APELLIDOS",
  "NOMBRES",
  "CEDULA",
  "ESTADOCIVIL",
  "IDGRADO",
  "IDFUERZA",
  "TELEFONO",
  "DEPARTAMENTO",
  "CIUDAD",
  "CODIGOMIN",
  "UNIDAD",
  "BATALLON",
  "IDPLAN",
  "IDASESOR",
  "FECHAIDESCUENTO",
  "USUARIO",
  "NITEMPRESA",
  "DESCRIPCIONFUERZA",
  "FECHATERCONTRATO",
  "VALORPLAN",
  "NROADICIONALES",
  "VALORADICIONAL",
  "VTAFILIACION",
  "DIRECCION",
  "TIPOVIVIENDA",
  "CELULAR",
  "FECHANACIMIENTO",
  "EDAD",
  "OBSERVACIONES",
  "DIRECCIONANT",
  "BARRIO",
  "MAIL",
  "TIENEIMAGEN",
  "MESESGRATIS",
  "FUNANTERIOR",
  "IDDIRECTOR",
  "CEDULACONTACTO",
  "NOMBRECONTACTO",
  "TELEFONOCONTACTO",
  "DIRECCIONCONTACTO",
  "CIUDADCONTACTO",
  "FNACIMIENTOCONTACTO",
  "EDADCONTACTO",
  "TIPOVIVIENDACONTACTO",
  "NOMBREREFERIDO",
  "TELEFONOREFERIDO",
  "NOMBREREFERIDOONE",
  "TELEFONOREFERIDOONE",
  "CUOTAS",
  "VALORCTOPOST",
  "REACTIVACION",
  "USUARIOREGISTRO",
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
    const mensaje = error.msg ? error.msg : "Error Al Crear La Digitacion";
    return res.status(500).json({
      msg: mensaje,
      msg2: error,
      iddigitacion: 0,
      codigoafiliacion: 0,
    });
  }

  //}
};

//editar Afiliacion
const editarDigitacion = async (req = request, res = response) => {
  const { ...digitacion } = req.body;
  const { iddigitacion } = req.query;
  const Adigitacion = [digitacion]
  try {
    const respuesta = await ExisteDigitacion(iddigitacion);
    if (respuesta.length === 0)
      return res.status(500).json({ msg: "No Existe La Digitacion" });
     const arrayDeArrays = Adigitacion.map((obj) => [
      ...ordenColumnasDigitacion.map((col) => obj[col]),
      iddigitacion,
    ]);
    await editarDigitacionQuery(arrayDeArrays)

    return res.status(200).json({
      msg: "Contrato Editado Con Exito"
    })
  } catch (error) {
 
    res.status(500).json({
      msg: "Se Presento Un Error Al Editar El Contrato",
      msg2: error,
      
    });
  }
};

//Crear Beneficiario En Digitacion
const crearDigitacionBenefi = async (req = request, res = response) => {
  const { idDigitacion, ...beneficiario } = req.body;

  const beneficiarios = [beneficiario];
  try {
    const respuesta = await ExisteDigitacion(idDigitacion);

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
      msg: "No Se Encuentra La Afiliacion " + idDigitacion,
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

//buscarBeneficiario

const searchBenefi = async (req = request, res = response) => {
  try {
    const { desde, hasta, cedula, contrato, empresa, iddigitacion } = req.query;

    const contratos = await BuscarContratos([
      desde,
      hasta,
      cedula,
      contrato,
      empresa,
      iddigitacion,
    ]);
    const respuesta = contratos.map((obj) => new Contrato(obj));
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(500).json({
      msg: "Se Presento Un rro Buscando Las Afiliaciones",
      msg2: error.message,
    });
  }
};

//Beneficiarios
const searchBenefiB = async (req = request, res = response) => {
  try {
    const { iddigitacion } = req.query;

    const beneficiarios = await BuscarBenefeciarios(iddigitacion);

    return res.status(200).json(beneficiarios);
  } catch (error) {
    return res.status(500).json({
      msg: "Se Presento Un rro Buscando Los Beneficiarios",
      msg2: error.message,
    });
  }
};
module.exports = {
  crearDigitacion,
  crearDigitacionBenefi,
  eliminarBenefi,
  searchBenefi,
  searchBenefiB,
  editarDigitacion,
};
