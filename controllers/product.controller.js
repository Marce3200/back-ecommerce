const product = require("../models/product.model");

const newProduct = async (req, res)=> {
    try {
        const p = new product(req.body);
      
        const result = await product.create(p);
        return res.json({
          "msg": "producto creado",
          "details": result
        });
    }
    catch(error) {
            return res.status(500).json({
              "msg": "inernal server error",
              "details": error.message
            });
    }
}

const findAll = async (req, res) => {
  try {
    const products = await product.find().select(['-stock']);
    
    return res.json({ products });
  } catch (error) {
    return res.status(500).json({
      "msg": "internal server error",
      "details": error.message
    })
  }
}  
    

const findOne = async (req, res) => {
  try {
    let id = req.params.id;
    const products = await product.findById(id)
    
    return res.json({ products });
  } catch (error) {
    return res.status(500).json({
      "msg": "internal server error",
      "details": error.message
    })
  }
}  

const update = async (req, res) => {
  let id = req.params.id;
  let { name, description, stock, price, img} = req.body;
  try {
    //let resultado;
   const resp = await product.findByIdAndUpdate(id,
      { name, description, stock, price, img }, {returnDocument:"after"});//finByIdAndUpdate, cuando se obtiene la respuesta, por defecto devuelve el valor del ID antes de ser actualizado.El after, da el valor despues de ser actualizado.

    return res.json({
      msg: "producto actualizado",
      details: resp
    });

  } catch (e) {
    return res.json({
      msg: "no resulto",
      details: e.message
    });
  }
}


module.exports = { newProduct, findAll, findOne, update };






