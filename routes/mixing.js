var express = require('express');
var router = express.Router();
const {Mix} = require("../controllers/mixingController")


router.post('/mix', Mix);

module.exports = router;
