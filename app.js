require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3333;

const app = express();
const indexRouter = require('./routes/index');
const issueRouter = require('./routes/issue');



app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/issue", issueRouter);


// Route qui génère une erreur
app.get("/error", (req, res) => {
  throw new Error("Oops! Une erreur s'est produite.");
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  // Envoi sur une page erreur
  res.status(500).render("erreur", { titre: "Erreur interne", erreur: err });
});

// Page non existante
app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log("le serveur tourne sur le port " + PORT);
});
