const express = require("express");
const router = express.Router();

const { findAll, findOne, signup, signIn, checkUser } = require("../controllers/user.controller");
const auth = require("../auth/auth");


router.get("/all", auth,  findAll);
router.post("/signup", signup);
router.get("/one",auth,  findOne);
router.post("/signin", signIn);
router.get("/logged-user",auth, checkUser);

module.exports = router;