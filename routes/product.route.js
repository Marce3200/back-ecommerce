const express = require("express");
const router = express.Router();

const { newProduct, findAll, findOne, update} = require("../controllers/product.controller");

router.get("/all", findAll);
router.post("/addProduct", newProduct);
router.get("/item/:id", findOne)
router.post("/edit/:id", update)


module.exports = router;