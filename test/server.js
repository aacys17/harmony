const express = require('express');
const payToMint = require('./mint-nft')
const transferOwnership = require('./transfer-ownership')
const { Account } = require('@harmony-js/account');



// import services
// const showtimeService = require('./services/showtimeService');
// const movieService = require('./services/movieService');
const cors = require('cors');

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/newaccount', (req, res) => {
    const account = new Account(); // or const account = Account.new()
    console.log(account);
    res.json({ message: 'New account created.' });

})

// app.get('/useaccount', () => {
//     console
// })

app.get('/mint-nft', (req, res) => {
    const contentId = 'Qmdbpbpy7fA99UkgusTiLhMWzyd3aETeCFrz7NpYaNi6zY';
    const tokenId = 9
    const metadataURI = `${contentId}/${tokenId}.json`;
    const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
    payToMint(metadataURI)
    console.log(metadataURI)
    res.json({ message: 'New NFT minted.' });
    
});

app.get('/transfer-ownership',(req, res) => {
    transferOwnership('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    res.json({ message: 'Ownership of the contract has been successfully transferred.' });
})

app.listen(port, () => {
    console.log('Server started listening at port: ' + port);
});