const { Account } = require('@harmony-js/account');
const fs = require('fs');


let passphrase = 'abcd'; // ask for password
let accountFileName = 'account.json';

const account = new Account(); // or const account = Account.new()


console.log('New account created !');
console.log('privateKey', account.privateKey);
console.log('publicKey', account.address);

// save account details in a file securly
account.toFile(passphrase).then(keystore => {
    fs.writeFileSync(accountFileName, keystore);
});

// const account = Account.add('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e'); // to import an account from its private key