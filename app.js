const express = require("express");

const app = express();
const port = 3000;
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let messages = [];

app.get("/", (req, res) => {
    res.render("index", { messages });
});

app.post("/issue/create", (req, res) => {
    const {auteur,titre, description, etat, date} = req.body;
    messages.push({ auteur, titre, description, etat, date });
    res.redirect("/");
});

app.listen(port, () => {
    console.log("le serveur tourne sur le port " + port);
});


