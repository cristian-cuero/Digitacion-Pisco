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
  check("ESTADOCIVIL").notEmpty().withMessage("El Estado Civil  es obligatorio"),
  check("IDPLAN").notEmpty().withMessage("Debes Seleccionar Un Plan"),
  check("IDASESOR").notEmpty().withMessage("Debes De Seleccionar Un Asesor"),
  check("DIRECCION").notEmpty().withMessage("Debes De Ingresar Una Direccion"),
  check("TIPOVIVIENDA").notEmpty().withMessage("Debes De Ingresar Una Vivienda"),
  check("FECHANACIMIENTO").notEmpty().withMessage("La Cedula es obligatorio")
  .isDate({ format: 'YYYY/MM/DD' }).withMessage("Debe Ser Una Fecha Valida"),
  check("IDDIRECTOR").notEmpty().withMessage("Debes De Ingresar Una El Supervisor"),
  check("DEPARTAMENTO").notEmpty().withMessage("Debes De Ingresar El Departamento"),
  check("CIUDAD").notEmpty().withMessage("Debes De Ingresar la Ciudad"),
  
  
];

module.exports = { validarAfiliacion };
