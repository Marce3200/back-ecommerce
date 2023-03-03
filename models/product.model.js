const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ['Disponible', 'No Stock', 'Descontinuado']
  },

  stock:{ //revisar que no sea quantity
    type:Number,
    require: true,
    default: 0
  },
  price:{
    type:Number,
    requiere:true
  },

  img:{
    type:String,
    requiere:true,
    default: "/public/images/productDefault.png" //crear imagen default
  }

});
const product = mongoose.model("product", productSchema);
module.exports = product;