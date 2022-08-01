require('dotenv').config();
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;



const Web3 = require('web3');

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
    'data': nftContract.methods.transferOwnership('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266').encodeABI()
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