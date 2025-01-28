const express = require("express");

const app = express();
const port = 3000;
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let tickets = [];

app.get(["/","/tickets"], (req, res) => {
    res.render("index", { tickets });
});

app.post("/issue/create", (req, res) => {
    const {auteur,titre, description, etat, date} = req.body;
    tickets.push({ auteur, titre, description, etat, date });
    res.redirect("/");
});

// Route qui génère une erreur
app.get('/error', (req, res) => {
  throw new Error('Oops! Une erreur s\'est produite.');
});

// Middleware de gestion des erreurs
app.use((err, req, res,next) => {
    console.error(err.stack);
    res.status(500).render("erreur", {titre: "Erreur interne", erreur: err});  
});
app.use((req,res,next)=> {
    res.status(404).render("404");
});

app.listen(port, () => {
    console.log("le serveur tourne sur le port " + port);
});


