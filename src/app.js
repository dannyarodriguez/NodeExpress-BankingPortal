const fs = require('fs')
const path = require('path')
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const accountData = fs.readFileSync("src/json/accounts.json", "UTF8");
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync("src/json/users.json", "UTF8");
const users = JSON.parse(userData);

const accountRoutes = require("./routes/accounts");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "./public/js/transfer.js")));
app.use(express.static(path.join(__dirname, "./public/css/styles.css")));

app.use('/', express.static(path.join(__dirname, 'public')))

app.use("/account", accountRoutes);

app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts: accounts }));

app.get('/savings', (req, res) => res.render('account', { account: accounts.savings }));
app.get('/checking', (req, res) => res.render('account', { account: accounts.checking }));
app.get('/credit', (req, res) => res.render('account', { account: accounts.credit }));

app.get('/profile', (req, res) =>  res.render('profile', { user: users[0] }));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});