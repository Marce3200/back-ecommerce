const express = require("express");
const router = express.Router();


const { addItem, remove, obtenerCarrito} = require("../controllers/carrito.controller");

router.post("/addItem", addItem);
router.post("/removeItem", remove);
router.get("/list", obtenerCarrito);



module.exports = router;