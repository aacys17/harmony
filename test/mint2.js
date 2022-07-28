const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType } = require("@harmony-js/utils");
const { Wallet } = require('@harmony-js/account');

const main = async () => {
    // const hmy = new Harmony("https://api.s0.ps.hmny.io", {
    //     chainType: ChainType.Harmony,
    //     // chainId: ChainID.HmyTestnet,
    //     chainId: 1666900000,

    // });

    const wallet = new Wallet(new Messenger(
        new HttpProvider('http://localhost:8545'),
        ChainType.Ethereum,
        31337,
    ));

    const contractJson = require("./fireguys.json");
    const contractAddr = "0x44f44BB5064684AEd29AFCaFb06c17B2220E798B";

    const contract = hmy.contracts.createContract(contractJson.abi, contractAddr);
    contract.wallet.addByPrivateKey('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e');

    await contract.wallet.getAccount(contract.wallet.accounts[0]).getBalance();

    console.log(contract.wallet);



    //

    const options1 = { gasPrice: '0x6FC23AC00' }; // gas price in hex corresponds to 1 Gwei or 1000000000
    // let options2 = { gasPrice: 1000000000, gasLimit: 21000 };

    const imageURI = `img/abc.png`;
    const gas = await contract.methods.payToMint(contract.wallet.accounts[0], imageURI).estimateGas(options1);
    console.log('gas required for getCount is ' + hexToNumber(gas));
    // contract.methods.payToMint(contract.wallet.accounts[0], imageURI).estimateGas(options1).then(gas => {
    //     console.log('gas required for getCount is ' + hexToNumber(gas));
    //     options2 = { ...options2, gasLimit: hexToNumber(gas) };
    //     contract.methods.payToMint(contract.wallet.accounts[0], imageURI).send(options2).then(response => {
    //         console.log(response.transaction.receipt);
    //     });
    // });


} // end main