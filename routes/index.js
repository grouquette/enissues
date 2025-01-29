const express = require("express");
const router = express.Router();
const tickets = require('../data/tickets');

/* GET home page. */
router.get(["/", "/tickets"], (req, res) => {
  res.render("index", { tickets: tickets });
});


module.exports = router;