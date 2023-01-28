const { default: mongoose } = require("mongoose");

// const itemQuantity = mongoose.Schema({
//   itemId: {
//     type: mongoose.ObjectId,
//     require: true,
//   },

//   quantity: {
//     type: Number,
//     default: 0,
//   },
// });

const carritoSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },

  productList: {
    type: [{}],
    require: true,
  },
});
const carrito = mongoose.model("carrito", carritoSchema);
module.exports = {carrito};

