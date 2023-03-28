import abi from "./Contract/chai.json"

import {useState, useEffect} from 'react';
import {ethers} from 'ethers';

import './App.css';
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import chai from "./Image/chai2.png"

function App() {
  const [state, setState] = useState({
    provider:null,
    signer:null,
    contract:null
  })
  useEffect(()=>{
    const connectWallet=async()=>{
      const contractAddress = "0x16a33CEb5703D9E5c4E9F1656209d67ceFcF42b9";
      const contractABI = abi.abi;
      try{
        const {ethereum}=window;

        if(ethereum){
          const account = await ethereum.request({method: "eth_requestAccounts",});

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });


          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer =provider.getSigner();
          const contract = new ethers.Contract(contractAddress,contractABI,signer);
          setAccount(account)
          setState({provider,signer,contract})
        }else{
          alert("Please install metamask");
        }
        }catch(error){
          console.log(error);
        }
    };
    connectWallet();
  },[]);
  const [account,setAccount]=useState("None");
  // console.log(state);
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
    <img src={chai} className="img-fluid" alt=".." width="70%"  style={{marginLeft:'200px' }}/>
    <p
      class="text-muted lead "
      style={{ marginTop: "10px", marginLeft: "5px" }}
    >
      <small>Connected Account - {account}</small>
    </p>
    
    <div className="container">
      <Buy state={state} />
      <Memos state={state} />
    </div>
  </div>
  );
}

export default App;
