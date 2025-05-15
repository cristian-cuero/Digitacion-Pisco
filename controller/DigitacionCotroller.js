const { response, request } = require("express");
const { insertarDigitacion, insertarDigitacionBeneficiario } = require("../database/queries/Digitacion");


const crearDigitacion = async (req = request, res = response) => {
  const data = req.body;

  try {
     const respuesta = await insertarDigitacion(data)
    let arrayDeArrays 
    if(!respuesta.msg &  data.benefeci){
      if (data.benefeci.length > 0){
        const ordenColumnas = ["NOMBRES", "APELLIDOS", "IDPARENTESCO", "EDAD", "USUARIO", "PROCESADO", "NITEMPRESA", "ADICIONAL", "VALORADICIONAL"];
         arrayDeArrays = data.benefeci.map(obj => [...ordenColumnas.map(col => obj[col]), respuesta.IDDIGITACION, respuesta.CODIGOAFILIACION]);
        await insertarDigitacionBeneficiario(arrayDeArrays)
      }
    }
    
    return res.status(200).json({
      respuesta: {
        ...respuesta,
        msg: "Afiliacion Creada"
      }
    });
  } catch (error) {
    console.log('error :>> ', error);
    return res.status(500).json({
      msg: error,
    });
  }

  //}
};

module.exports = { crearDigitacion };
