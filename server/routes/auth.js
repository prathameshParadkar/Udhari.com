const express = require("express");
const router = express.Router()
const auth = require("../controllers/auth");

router.post('/login', auth.loginUser);

router.post('/register', auth.registerUser);

module.exports = router;