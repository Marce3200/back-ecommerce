const express = require("express");
const router = express.Router();


const { addItem, remove} = require("../controllers/carrito.controller");

router.post("/addItem", addItem);
router.post("/removeItem", remove);



module.exports = router;