const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  auteur: { type: String, required: true },
  titre: { type: String, required: true },
  description: { type: String, required: true },
  dateCreation: { type: Date, required: true },
  etat: { type: String, required: true },
  dateModification: { type: Date, required: false },
  reponses: [{type: mongoose.Schema.Types.ObjectId, ref: "Answer"}]
});

module.exports = mongoose.model("Ticket", ticketSchema);
