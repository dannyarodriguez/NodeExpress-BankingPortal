const fs = require('fs')
const path = require('path')
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "./public/js/transfer.js")));
app.use(express.static(path.join(__dirname, "./public/css/styles.css")));

app.use('/', express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    res.render("index", { title: "Account Summary" });
  });

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});