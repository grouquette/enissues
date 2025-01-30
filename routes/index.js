const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Ticket = require('../services/ticketsService');

mongoose.connect("mongodb://localhost:27017/enissuedb");

/* GET home page. */
router.get(["/", "/tickets"], async (req, res) => {
  const tickets = await Ticket.find();
  res.render("index", {tickets });
});


module.exports = router;