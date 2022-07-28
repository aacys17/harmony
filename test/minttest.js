const { Account } = require('@harmony-js/account');
const { HttpProvider, Messenger } = require('@harmony-js/network');
const { ChainType } = require('@harmony-js/utils');
const account = new Account(
    '7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6',
    new Messenger(
        new HttpProvider('https://api.s0.ps.hmny.io'),
        ChainType.Harmony,
        1666900000,
    ),
);
account.getBalance().then(response => {
    console.log(response);
});