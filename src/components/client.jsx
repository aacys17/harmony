import axios from "axios";

// const client = axios.create({
//   baseURL: "http://localhost:3000" 
// });

const Client = () => {
 
    const mint = () => {
        axios.get('http://localhost:3000/mint-nft').then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err)
        });
    };
    const transferOwnership = () => {
        axios.get('http://localhost:3000/transfer-ownership').then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err)
        });
    };
 
    return (
        <div>
        <button onClick={mint}>Mint</button>
        <button onClick={transferOwnership}>Transfer Ownership</button>
        </div>
    );
 };
 
 export default Client;