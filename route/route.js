const express = require('express');
const router = express.Router();
const coinController = require("../controller/chainController");

// API endpoint to get the list of top 100 cryptocurrency coins
router.get('/coins', coinController.getCoins);

module.exports = router;
