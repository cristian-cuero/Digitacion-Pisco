const { response, request, json } = require("express");
const { jsbn } = require("node-forge");
const {
  getUsersLogin,
  allUser,
  getUsername,
  updateUserQuery,
} = require("../database/queries/User");
const { getValueByInsensitiveKey } = require("../helpers/ComelCase");
const { generarJWT } = require("../helpers/generarWTK");
const campos = [
  "nombre",
  "apellido",
  "estado",
  "idPersona",
  "usuarioModif",
  "idVendedor",
  "username"
];

const auth = async (req = request, res = response) => {
  const { username, password } = req.body;

  try {
    const user = await getUsersLogin(username, password);
    if (!user) {
      return res.status(401).json({
        msg: "Usuario o contraseña inválidos",
      });
    }
    const token = await generarJWT(user.username);
    user.TOKEN = token;
    return res.status(200).json({
      ...user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }

  //}
};

const allUsuarios = async (req = request, res = response) => {
  try {
    const {user} = req.query
    const users = await allUser(user);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      msg: " Se presento Un Error ",
      msg2: error.message,
    });
  }
};

const updateUser = async (req = request, res = response) => {
  try {
    const user = [req.body];
    const usuario = await getUsername(user[0].username);
    if (!usuario) {
      return res.status(400).json({
        msg: "El Usuario No Existe",
      });
    }
    const arrayDeArrays = user.map(obj => 
      campos.map(col => getValueByInsensitiveKey(obj, col))
    );
    const username = await updateUserQuery(arrayDeArrays)
    if (username ){
      return res.status(200).json({
        msg: "Usuario Actualizado",
      })
    }else{
      return res.status(400).json({
        msg: "Usuario No Se Pudo  Actualizar",
      })
    }
  } catch (error) {
    return res.status(500).
      json({
        msg: "Se Presento Un Error Al Editar El usaurio",
        msg2: error.message,
      });
  }
};

module.exports = { auth, allUsuarios, updateUser };
