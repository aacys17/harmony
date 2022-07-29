
const { ContractFactory } = require('@harmony-js/contract');
const { Wallet } = require('@harmony-js/account');
const { Messenger, HttpProvider } = require('@harmony-js/network');
const { ChainID, ChainType, hexToNumber } = require('@harmony-js/utils');

const wallet = new Wallet(new Messenger(
    new HttpProvider('http://localhost:8545'),
    ChainType.Ethereum,
    31337,
));

wallet.addByPrivateKey('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e');

const contractJson = require("../src/artifacts/contracts/MyNFT.sol/FiredGuys.json");
const contractAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


const factory = new ContractFactory(wallet);
const contract = factory.createContract(contractJson.abi, contractAddr);


console.log(contract.methods);

console.log(contract.wallet.accounts[0]);
const account = contract.wallet.getAccount(contract.wallet.accounts[0]);

account.getBalance().then(response => {
    // ethers.utils.formatEther(balance)
    console.log(response);
//     const options1 = { gasPrice: '0x6FC23AC00'}; // gas price in hex corresponds to 1 Gwei or 1000000000
//     let options2 = { gasPrice: 30000000000, gasLimit: 21000}; // setting the default gas limit, but changing later based on estimate gas
    
//     const imageURI = `img/abc.png`;
    
//     // contract.methods.safeMint(account.address, imageURI).estimateGas(options1).then(gas => {
//         // contract.methods.payToMint(account.address, imageURI).send(options1).then(response => {
//             //     console.log(response.transaction.receipt);
//             // })
//             contract.methods.payToMint(account.address, imageURI).estimateGas(options1).then(gas => {
//                 console.log('gas required for getCount is ' + hexToNumber(gas));
//                 options2 = { ...options2, gasLimit: hexToNumber(gas) };
//                 contract.methods.payToMint(account.address, imageURI).send(options2).then(response => {
//                     console.log(response.transaction.receipt);
//                 });
//             })
//             .catch(error => console.log(error));
        });

// module.exports = function () {
//     harmony.blockchain
//       .getBalance({
//         address: accounts[0],
//       })
//       .then((res) => {
//         console.log(accounts[0], "curr balance: ", new harmony.utils.Unit(res.result).asWei().toEther());
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
