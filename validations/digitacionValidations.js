const { check } = require("express-validator");

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
];

const validarAfiliacionBenefi = [
  // Validar campo raíz
  check("Codigoafiliacion")
    .notEmpty()
    .withMessage("El Código de Afiliación es obligatorio")
    .isNumeric()
    .withMessage("El Código de Afiliación debe ser numérico"),

  // Validar arreglo de beneficiarios
  check("beneficiarios")
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos un beneficiario"),

  check("beneficiarios.*.NOMBRES")
    .notEmpty()
    .withMessage("El Nombre del beneficiario es obligatorio"),

  check("beneficiarios.*.APELLIDOS")
    .notEmpty()
    .withMessage("El Apellido del beneficiario es obligatorio"),

  check("beneficiarios.*.IDPARENTESCO")
    .notEmpty()
    .withMessage("El Parentesco del beneficiario es obligatorio"),

  check("beneficiarios.*.NITEMPRESA")
    .notEmpty()
    .withMessage("La Empresa del beneficiario es obligatoria"),

  check("beneficiarios.*.USUARIO")
    .notEmpty()
    .withMessage("El Usuario del beneficiario es obligatorio"),

  check("beneficiarios.*.PROCESADO")
    .isIn([0, 1])
    .withMessage("El campo PROCESADO debe ser 0 o 1"),

  check("beneficiarios.*.ADICIONAL")
    .notEmpty()
    .withMessage("El campo ADICIONAL es obligatorio"),

  check("beneficiarios.*.VALORADICIONAL")
    .isNumeric()
    .withMessage("VALORADICIONAL debe ser un número"),
];

module.exports = { validarAfiliacion, validarAfiliacionBenefi };
