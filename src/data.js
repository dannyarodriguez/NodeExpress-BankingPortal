const fs = require('fs');
const path = require('path');

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8');

const accounts = JSON.parse(accountData);
const users = JSON.parse(userData);

const writeJSON = () => {
    let accountsJSON = JSON.stringify(accounts, null, 4)
    fs.writeFileSync(path.join(__dirname, 'json','accounts.json'), accountsJSON, 'utf8');
}

module.exports = {
  accounts,
  users,
  writeJSON
};