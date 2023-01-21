const fs = require('fs')
const path = require('path')

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { accounts, users, writeJSON } = require('./data.js');

//const accountRoutes = require("./routes/accounts");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

//app.use("/account", accountRoutes);

app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts: accounts }));

app.get('/savings', (req, res) => res.render('account', { account: accounts.savings }));
app.get('/checking', (req, res) => res.render('account', { account: accounts.checking }));
app.get('/credit', (req, res) => res.render('account', { account: accounts.credit }));

app.get('/profile', (req, res) =>  res.render('profile', { user: users[0] }));

app.get('/transfer', (req, res) =>  res.render('transfer'));
app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance -= req.body.amount;
    accounts[req.body.to].balance += parseInt(req.body.amount, 10);
    writeJSON();
    res.render('transfer', {message: 'Transfer Completed'});
});

app.get('/payment', (req, res) => res.render('payment', {account: accounts.credit}));
app.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount);
    writeJSON();
    res.render('payment', {message: 'Payment Successful', account: accounts.credit});
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});