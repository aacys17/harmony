// require("dotenv").config()
// const API_URL = process.env.API_URL
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
// const web3 = createAlchemyWeb3(API_URL)

// const contract = require("../src/artifacts/contracts/MyNFT.sol/FiredGuys.json")


// const contractAddress = "0x010A4bf4F26306815AF3d47b2D4741bE0F2bD03B"

// const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

require('dotenv').config();
// const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(API_URL);

const Web3 = require('web3');

//Create web3 instance
const web3 = new Web3('https://api.s0.ps.hmny.io');

const contract = require("../src/artifacts/contracts/MyNFT.sol/FiredGuys.json");
const contractAddress = "0xA2a189268b919e9a62AcfF0FDF77aEDF03CDA862";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function payToMint(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

//the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 5000000,
    'data': nftContract.methods.payToMint(PUBLIC_KEY, tokenURI).encodeABI()
  }

  web3.eth.getBalance(PUBLIC_KEY).then(response => {
  console.log(response);
});
const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
signPromise
  .then((signedTx) => {
    web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      function (err, hash) {
        if (!err) {
          console.log(
            "The hash of your transaction is: ",
            hash,
            "\nCheck Alchemy's Mempool to view the status of your transaction!"
          )
        } else {
          console.log(
            "Something went wrong when submitting your transaction:",
            err
          )
        }
      }
    )
  })
  .catch((err) => {
    console.log(" Promise failed:", err)
  })
}

const contentId = 'Qmdbpbpy7fA99UkgusTiLhMWzyd3aETeCFrz7NpYaNi6zY';
const tokenId = 1
const metadataURI = `${contentId}/${tokenId}.json`;
const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
payToMint(metadataURI)
console.log(metadataURI)