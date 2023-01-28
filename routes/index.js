const express = require("express");
const router = express.Router();

const userRouter = require("./user.route");
const productRouter = require("./product.route");
const carritoRouter = require("./carrito.route");
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/carrito", carritoRouter);

module.exports = router;