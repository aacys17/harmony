const { Account } = require('@harmony-js/account');
const fs = require('fs');

let passphrase = 'abcd'; // ask for password
let accountFileName = 'account.json';

const keystore = fs.readFileSync(accountFileName).toString();

const account = new Account();
account.fromFile(keystore, passphrase).then(account => {
    // account loaded
    console.log(account.address);
    //

});