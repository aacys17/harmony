
const { ContractFactory } = require('@harmony-js/contract');
const { Wallet } = require('@harmony-js/account');
const { Messenger, HttpProvider } = require('@harmony-js/network');
const { ChainID, ChainType, hexToNumber } = require('@harmony-js/utils');

const wallet = new Wallet(new Messenger(
    new HttpProvider('https://api.s0.ps.hmny.io'),
    ChainType.Harmony,
    1666900000,
));

wallet.addByPrivateKey('ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80');

const contractJson = require("../src/artifacts/contracts/MyNFT.sol/FiredGuys.json");
const contractAddr = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";


const factory = new ContractFactory(wallet);
const contract = factory.createContract(contractJson.abi, contractAddr);


console.log(contract.methods);

console.log(contract.wallet.accounts[0]);
const account = contract.wallet.getAccount(contract.wallet.accounts[0]);

account.getBalance().then(response => {
    // ethers.utils.formatEther(balance)
    console.log(response);
    const options1 = { gasPrice: '0x6FC23AC00'}; // gas price in hex corresponds to 1 Gwei or 1000000000
    let options2 = { gasPrice: 30000000000, gasLimit: 21000 }; // setting the default gas limit, but changing later based on estimate gas
    
    const imageURI = `img/abc.png`;
    
    // contract.methods.safeMint(account.address, imageURI).estimateGas(options1).then(gas => {
        // contract.methods.payToMint(account.address, imageURI).send(options1).then(response => {
            //     console.log(response.transaction.receipt);
            // })
            contract.methods.payToMint(account.address, imageURI).estimateGas(options1).then(gas => {
                console.log('gas required for getCount is ' + hexToNumber(gas));
                options2 = { ...options2, gasLimit: hexToNumber(gas) };
                contract.methods.payToMint(account.address, imageURI).send(options2).then(response => {
                    console.log(response.transaction.receipt);
                });
            })
            .catch(error => console.log(error));
        });
