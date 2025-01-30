const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket", required: true,},
  auteur: { type: String, required: true },
  contenu: { type: String, required: true },
  dateCreation: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("Answer", answerSchema);
