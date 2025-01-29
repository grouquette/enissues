const express = require("express");
const router = express.Router();
const tickets = require("../data/tickets");

let id = 0;

/* POST issue creation. */
router.post("/create", (req, res) => {
  id++;
  const { auteur, titre, description, etat, date } = req.body;
  tickets.push({ id, auteur, titre, description, etat, date });
  res.redirect("/");
});

router.get("/detail/:id", (req, res) => {
  const id = req.params.id;

  // Trouver le ticket à modifier
  const ticket = tickets.find((t) => t.id == id);

  if (!ticket) {
    // Si le ticket n'est pas trouvé, rediriger vers la page d'accueil
    return res.redirect("/");
  }

  // Rendre la page de modification avec les données du ticket
  res.render("detail", { ticket });
});

router.get("/delete/:id", (req, res) => {
  const idx = req.params.id;
  

  // Trouver l'index du ticket dans le tableau
  const index = tickets.findIndex((ticket) => ticket.id == idx);
  

  // Si le ticket est trouvé
  if (index !== -1) {
    // Supprimer le ticket
    tickets.splice(index, 1);
  }

  // Rediriger vers la page d'accueil
  res.redirect("/");
});

router.get("/update/:id", (req, res) => {
  const id = req.params.id;

  // Trouver le ticket à modifier
  const ticket = tickets.find((t) => t.id == id);

  if (!ticket) {
    // Si le ticket n'est pas trouvé, rediriger vers la page d'accueil
    return res.redirect("/");
  }

  // Rendre la page de modification avec les données du ticket
  res.render("update", { ticket });
});

router.post("/update/:id", (req, res) => {
  const id = req.params.id;

  // Trouver l'index du ticket dans le tableau
  const index = tickets.findIndex((t) => t.id == id);

  if (index !== -1) {
    // Mettre à jour le ticket avec les nouvelles données
    tickets[index] = {
      // Garder l'id et autres propriétés existantes
      ...tickets[index],
      // modifier les valeurs
      titre: req.body.titre,
      auteur: req.body.auteur,
      description: req.body.description,
      etat: req.body.etat,
      dateModification: new Date(),
    };
  }

  // Rediriger vers la page d'accueil
  res.redirect("/");
});

module.exports = router;