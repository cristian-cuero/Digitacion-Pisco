const { response, request } = require("express");
const { getUsersLogin } = require("../database/queries/User");
const { generarJWT } = require("../helpers/generarWTK");

const auth = async (req = request, res = response) => {
  const { username, password } = req.body;

  try {
    const user = await getUsersLogin(username, password);
    if (!user) {
      return res.status(401).json({
        msg: "Usuario o contraseña inválidos",
      });
    }
    const token = await generarJWT(user.username)
    user.TOKEN = token
    return res.status(200).json({
      ...user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }

  //}
};

module.exports = { auth };
