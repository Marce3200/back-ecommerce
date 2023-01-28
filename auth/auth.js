const { expressjwt: jwt} = require("express-jwt") //esa libreria le permite a express saber que va a llegar token 

require("dotenv").config();

const getToken = (req) =>{ //este metodo extrae el token de la cabecera
     let {authorization} = req.headers;
     if (authorization) {
        let [type, token] = authorization.split(" "); // extrae los datos de la cadena y los divide en dos
        return (type === 'Token' || type === "Bearer") ? token : null; // si el type es token o bearer devuelve algo.
     }
     return null;
}

const auth = jwt({ // este metodo retorna el string del token. se le especifica el secreto, el algorithm y el user property
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    userProperty: "user", //payload que en user va a quedar almacenado la respuesta. Esto hace que despues se pueda hacer un request.user
    getToken






});

module.exports = auth;
