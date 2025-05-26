const { check } = require("express-validator");
const { query } = require("express-validator");
const validarAfiliacion = [
  check("FECHAAFILIACION")
    .notEmpty()
    .withMessage("La Fecha de Afiliación es obligatoria"),
  check("CODIGOAFILIACION")
    .notEmpty()
    .withMessage("El Código de Afiliación es obligatorio"),
  check("APELLIDOS").notEmpty().withMessage("El Apellido es obligatorio"),
  check("NOMBRES").notEmpty().withMessage("El Nombre es obligatorio"),
  check("CEDULA").notEmpty().withMessage("La Cedula es obligatorio"),
  check("ESTADOCIVIL")
    .notEmpty()
    .withMessage("El Estado Civil  es obligatorio"),
  check("IDPLAN").notEmpty().withMessage("Debes Seleccionar Un Plan"),
  check("IDASESOR").notEmpty().withMessage("Debes De Seleccionar Un Asesor"),
  check("DIRECCION").notEmpty().withMessage("Debes De Ingresar Una Direccion"),
  check("TIPOVIVIENDA")
    .notEmpty()
    .withMessage("Debes De Ingresar Una Vivienda"),
  check("FECHANACIMIENTO")
    .notEmpty()
    .withMessage("La Cedula es obligatorio")
    .isDate({ format: "YYYY/MM/DD" })
    .withMessage("Debe Ser Una Fecha Valida"),
  check("IDDIRECTOR")
    .notEmpty()
    .withMessage("Debes De Ingresar Una El Supervisor"),
  check("DEPARTAMENTO")
    .notEmpty()
    .withMessage("Debes De Ingresar El Departamento"),
  check("CIUDAD").notEmpty().withMessage("Debes De Ingresar la Ciudad"),
  check("TELEFONOREFERIDO")
    .optional() // permite que esté ausente o vacío
    .isString()
    .withMessage("El teléfono debe ser una cadena"),
];

const validarAfiliacionBenefi = [
  // Validar campo raíz
  check("idDigitacion")
    .notEmpty()
    .withMessage("El id de Afiliación es obligatorio")
    .isNumeric()
    .withMessage("El id de Afiliación debe ser numérico"),
  check("NOMBRES")
    .notEmpty()
    .withMessage("El Nombre del beneficiario es obligatorio"),

  check("APELLIDOS")
    .notEmpty()
    .withMessage("El Apellido del beneficiario es obligatorio"),

  check("IDPARENTESCO")
    .notEmpty()
    .withMessage("El Parentesco del beneficiario es obligatorio"),

  check("NITEMPRESA")
    .notEmpty()
    .withMessage("La Empresa del beneficiario es obligatoria"),

  check("USUARIO")
    .notEmpty()
    .withMessage("El Usuario del beneficiario es obligatorio"),

  check("PROCESADO")
    .isIn([0, 1])
    .withMessage("El campo PROCESADO debe ser 0 o 1"),

  check("ADICIONAL")
    .notEmpty()
    .withMessage("El campo ADICIONAL es obligatorio"),

  check("VALORADICIONAL")
    .isNumeric()
    .withMessage("VALORADICIONAL debe ser un número"),
];

const validarBusqueda = [
  // Middleware personalizado: asegura que al menos uno esté presente
  (req, res, next) => {
    const { hasta, desde, cedula, contrato, empresa } = req.query;

    if (!desde && !cedula && !contrato & !hasta & !empresa) {
      return res.status(400).json({
        msg: "Debe proporcionar al menos uno de los siguientes parámetros: fecha, cedula o contrato o Empresa",
      });
    }

    if ((desde && !hasta) || (!desde && hasta)) {
      return res.status(400).json({
        msg: 'Debe proporcionar tanto "desde" como "hasta" si quiere filtrar por fechas',
      });
    }

    if (desde && hasta) {
      const desdeDate = new Date(desde);
      const hastaDate = new Date(hasta);
      if (desdeDate > hastaDate) {
        return res.status(400).json({
          msg: '"desde" no puede ser mayor que "hasta"',
        });
      }
    }

    next();
  },

  // Validaciones opcionales si están presentes
  query("desde")
    .optional()
    .isISO8601()
    .withMessage("La fecha desde debe tener un formato válido (YYYY-MM-DD)"),

  query("hasta")
    .optional()
    .isISO8601()
    .withMessage("La fecha hasta debe tener un formato válido (YYYY-MM-DD)"),

  query("cedula")
    .optional()
    .isNumeric()
    .withMessage("La cédula debe ser numérica"),

  query("contrato")
    .optional()
    .isNumeric()
    .withMessage("El contrato debe ser una cadena"),
  query("empresa")
    .optional()
    .isString()
    .withMessage("El contrato debe ser una cadena"),
];

module.exports = {
  validarAfiliacion,
  validarAfiliacionBenefi,
  validarBusqueda,
};
