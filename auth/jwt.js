const jwt = require("jsonwebtoken");

require("dotenv").config();

const getToken = (username) => {
  //recibe nombre de usuario
  return jwt.sign(
    {
      sub: username, // se usa sub por convencion
    },
    process.env.SECRET
  );
}; //dado el secreto y el username, nos va a crear el token

const validateToken = (token) => {
  return jwt.validateToken(token, process.env.SECRET);
};



const extractSub = (req) => {
  let { authorization } = req.headers;
  if (authorization) {
    let [type, token] = authorization.split(" ");
    if (type === "Token" || type === "Bearer") {
      let { sub } = jwt.verify(token, process.env.SECRET);
      return sub;
    }
  }
  return null;
};

module.exports = { getToken, validateToken, extractSub };
