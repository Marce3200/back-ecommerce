const { carrito } = require("../models/carrito.model");

const jwt = require("../auth/jwt");

const newCarrito = async (username) => {
  // por cada usuario se crea carrito vacio
  try {
    const result = await carrito.create({
      username: username,
      productList: [],
    }); //el carrito nuevo se crea con el ID del usuario y la lista de productos tiene arreglo vacio porque no tiene ni un producto.
  } catch (error) {}
};
const obtenerCarrito = async (req, res) =>{
  
  
  try {const username = jwt.extractSub(req);
 
    const filter = {
      //crea filtro para buscar usuario en bd
      username: username,
    };
  
    const car = await carrito.findOne(filter);
    return res.json( car.productList );
  } catch (error) {
    return res.status(500).json({
      msg: "internal server error",
      details: error.message,
    });
  }
}
const addItem = async (req, res) => {
  try {
    const username = jwt.extractSub(req);
    const { itemId, quantity } = req.body;
    const filter = {
      //crea filtro para buscar usuario en bd
      username: username,
    };

    const car = await carrito.findOne(filter); // se busca un carrito que tenga ese username
    //validacion
    const requiredIndex = car.productList.findIndex((el) => {
      //findIndex es un metodo de arreglo, encuentra el indice de algo que estemos buscando, dentro d ela lista de productos que es car.productlist
      return el.itemId === String(itemId); // cada el (elemento) es un producto. Va a buscar el el.id sea igual al que estamos buscando
    });
    if (requiredIndex === -1) {
      // -1 significa que el producto no esta en el carrito aun
      const iq = { itemId: itemId, quantity: quantity };

      car.productList.push(iq); //agregamos el producto a la lista de productos.
      car.save(); //se guarda en la bd
    } else {
      car.productList.set(requiredIndex, {
        itemId: itemId,
        quantity: quantity,
      }); //con esto hacemos el update de la cantidad de producto en el carrito

      await car.save();
    }

    return res.json({
      msg: "ok",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "error interno del servidor",
      details: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const username = jwt.extractSub(req);
    const { itemId } = req.body;
    const filter = {
      //crea filtro para buscar usuario en bd
      username: username,
    };

    const car = await carrito.findOne(filter); // se busca un carrito que tenga ese username
    const requiredIndex = car.productList.findIndex((el) => {
      //findIndex es un metodo de arreglo, encuentra el indice de algo que estemos buscando, dentro d ela lista de productos que es car.productlist
      return el.itemId === String(itemId); // cada el (elemento) es un producto. Va a buscar el el.id sea igual al que estamos buscando
    });
    car.productList.pull(car.productList[requiredIndex]); //set es para modificar, push para agregar, pull para eliminar
    car.save();
    return res.json({
      msg: "ok",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "error al consultar los posts",
      details: error.message,
    });
  }
};

module.exports = { newCarrito, addItem, remove };
