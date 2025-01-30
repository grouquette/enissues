const express = require("express");
const router = express.Router();
const Ticket = require("../services/ticketsService");
const Answer = require("../services/answerService")



/* POST issue creation. */
router.post("/create", async (req, res) => {
  const newTicket = new Ticket({
    auteur: req.body.auteur,
    titre: req.body.titre,
    description: req.body.description,
    dateCreation: req.body.dateCreation,
    etat: req.body.etat
  });
  await newTicket.save();
  res.redirect("/");
});

router.get("/detail/:id", async (req, res) => {
  try {
    // Trouver le ticket à afficher
    const ticket = await Ticket.findById(req.params.id)
    .populate("reponses");
    // Si le ticket n'est pas trouvé, rediriger vers la page d'accueil
    if (!ticket) {
      return res.status(404).render("404");
    }
    // Rendre la page avec les données du ticket
    res.render("detail", { ticket });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("erreur", {
        titre: "Erreur interne",
        message: "Erreur lors de la récupération du ticket",
        erreur: error
      }); 
  }
});

router.post("/answer/:ticketId", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if(!ticket){
      return res.status(404).send("Ticket non trouvé");
    }

    // Créer la nouvelle réponse
    const reponse = new Answer({
      ticketId: ticket.id,
      auteur: req.body.auteur,
      contenu: req.body.contenu,
      dateCreation: new Date()
    });

    // Sauvegarder la réponse
    await reponse.save();
    // Ajouter la référence de la réponse au ticket
    ticket.reponses.push(reponse._id);
    await ticket.save();

    // Mettre à jour la date de modification du ticket
    await Ticket.findByIdAndUpdate(ticket._id, {
      dateModification: new Date()
    });
    res.redirect("/")
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'ajout de la réponse")    
  }

})

router.get("/delete/:id", async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

router.get("/update/:id", async (req, res) => {
  // Trouver le ticket à modifier
  const ticket = await Ticket.findById(req.params.id);
  // Si le ticket n'est pas trouvé, rediriger vers la page d'accueil
  if (!ticket) {
    return res.redirect("/");
  }
  // Rendre la page de modification avec les données du ticket
  res.render("update", { ticket });
});

router.post("/update/:id", async (req, res) => {
 try {
   // Ajout de la date de modification
   req.body.dateModification = new Date();

   const updatedTicket = await Ticket.findByIdAndUpdate(
     req.params.id,
     {
       ...req.body,
       dateModification: new Date(),
     },
     { new: true }
   );

   if (!updatedTicket) {
     return res.status(404).send("Ticket non trouvé");
   }
   res.redirect("/");
 } catch (error) {
  console.error(error);
  res.status(500).send("Erreur lors de la mise à jour du ticket");
 } 
});

module.exports = router;