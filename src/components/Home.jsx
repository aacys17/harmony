import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';
import axios from "axios";

import { ethers } from 'ethers';
import FiredGuys from '../artifacts/contracts/MyNFT.sol/FiredGuys.json';

const contractAddress = '0x26F29de8Fb172451961CcA79a79c6C94cD0e19bd';

// const provider = new ethers.providers.Web3Provider(window.ethereum);
const provider = new ethers.providers.JsonRpcProvider('https://api.s0.ps.hmny.io');

// get the end user
// const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, FiredGuys.abi, provider);


function Home() {

  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

      <h1>Fired Guys NFT Collection</h1>
      <div className="container">
        <div className="row">
          {Array(totalMinted + 1)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="col-sm">
                <NFTImage tokenId={i} getCount={getCount} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  // const contentId = 'Qmdbpbpy7fA99UkgusTiLhMWzyd3aETeCFrz7NpYaNi6zY';
  const contentId = 'QmWkhm3PYPMRaUPgxLTjgzLKAErATVFmi7nnSWCoWBdsch';
  const metadataURI = `${contentId}/pet${tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/pet${tokenId}.jpeg`;
//   const imageURI = `img/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result, metadataURI)
    setIsMinted(result);
  };

  // const mintToken = async () => {
  //   const connection = contract.connect(signer);
  //   const addr = connection.address;
  //   const result = await contract.payToMint(addr, metadataURI, {
  //     value: ethers.utils.parseEther('0.05'),
  //   });

  //   await result.wait();
  //   getMintedStatus();
  //   getCount();
  // };

   const mintToken = async (tokenId) => {
    axios.get('http://localhost:3000/mint-nft/?tokenId='+ tokenId).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      getMintedStatus();
      getCount();
    });
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={isMinted ? imageURI : 'img/placeholder.png'}></img>
      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
        {!isMinted ? (
          <button className="btn btn-primary" onClick={() => mintToken(tokenId)}>
            Mint
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={getURI}>
            Taken! Show URI
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
