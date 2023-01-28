const user = require("../models/user.model");
const { newCarrito } = require("./carrito.controller");
const jwt = require("../auth/jwt");

const signIn = async (req, res) => {
  //metodo del controlador
  try {
    const filter = {
      //crea filtro para buscar usuario en bd
      username: req.body.username,
      // password: req.body.password,
      active: true,
    };
    const u = await user.findOne(filter);
    if (u && u?.validPassword(req.body.password)) {//
      //si el usario existe, preguntamos si el password es valido. Hay que hacerlo asi porque el password es encrptado.
      return res.json({
        msg: "ok",
        // si esta ok, devuelveme un token
        token: jwt.getToken(req.body.username),
      });
    } else {
      console.warn("intento de ingreso no autorizado");
      return res.status(401).json({
      //return resizeTo.status(401).json({
        msg: "no autorizado",
        details: "usuario no cuenta con autorización",
      });
    }
  } catch (error) {
    return res.json({
    msg: "error en autenticacion",
    details: error.message,
    })
  }
};

const findAll = async (req, res) => {
  try {
    const users = await user.find();
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({
      msg: "error interno del servidor",
      details: error.message,
    });
  }
};

const signup = async (req, res) => {
  // metodo para crear un usuario
  try {
    const u = new user(req.body);
    u.hashPassword(req.body.password);
    const result = await user.create(u);
    newCarrito(result.username);

    return res.json({
      msg: "usuario creado",
      details: result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "error interno del servidor",
      details: error.stack,// stack para recibir m'as info acerca del error
    });
  }
};

const findOne = async (req, res) => {
  return res.json(Promise.resolve({ uno: "uno" }));
};

const checkUser = async (req,res) => {
  const username = jwt.extractSub(req);
  console.log("usuario:" + username)
  try {
    const filter = {
      //crea filtro para buscar usuario en bd
      username: username,
      // password: req.body.password,
      active: true,
    };
    const u = await user.findOne(filter);
    if (u) {
     
      return res.json({
        u
      });
    } else {
      console.warn("intento de ingreso no autorizado");
      return res.status(401).json({
      //return resizeTo.status(401).json({
        msg: "no autorizado",
        details: "usuario no cuenta con autorización",
      });
    }
  } catch (error) {
    return res.json({
    msg: "error en autenticacion",
    details: error.message,
    })
  }
}
module.exports = { findAll, findOne, signup, signIn, checkUser };
