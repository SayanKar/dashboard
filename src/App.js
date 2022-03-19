import "./App.css";
import ReactTooltip from "react-tooltip";
import logo from "./assets/logo.png";
import claimRewardsIcon from "./assets/claimReward.png";
import vault from "./assets/vault.png";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAlert } from "react-alert";
import { CONTRACT_ADDRESS, abi, NETWORKS_LIST, NETWORK } from "./config.js";

function App() {
  const alert = useAlert();
  const [unclaimedRewards, setUnclaimedRewards] = useState(0);
  const [stakedNfts, setStakedNfts] = useState(0);
  const [contract, setContract] = useState();
  const [address, setAddress] = useState();

  async function switchNetwork() {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: NETWORKS_LIST[NETWORK]["chainId"] }],
      });
      alert.success("Switched to " + NETWORK + " network");
      return true;
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [NETWORKS_LIST[NETWORK]],
          });
          alert.success("Added network successfully");
          return true;
        } catch (addError) {
          console.log(addError);
          alert.error("Failed to add Network");
        }
      }
      console.log(switchError);
      alert.error("Failed to add " + NETWORK + " network");
      return false;
    }
  }

  async function connect() {
    console.log("connectCalled");
    if (typeof window.ethereum === "undefined") {
      console.log("MetaMask is not installed!");
      alert.error("Couldn't find MetaMask");
    } else {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        let switchNetworkSucces = switchNetwork();
        if (!switchNetworkSucces) return;
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const add = await signer.getAddress();
          setAddress(add);
          try {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
            setContract(contract);
            console.log("success");
            alert.success("Connected to MetaMask");
          } catch (err) {
            alert.error("Something went wrong!");
            console.log(err);
          }
        } catch (err) {
          console.log(err);
          alert.error("Something went wrong!");
        }
      } catch (err) {
        console.log(err);
        alert.error(err.message);
      }
    }
  }

  const onRegister = async () => {
    if (contract) {
      try {
        let txn = await contract.Register();
        alert.info("Transction Submitted");
        await txn.wait();
        alert.success("Transaction Successful");
        getUnclaimedRewards();
        getStakedNfts();
      } catch (err) {
        console.log(err);
        alert.error(err.error.message);
      }
    } else {
      alert.error("Connect To MetaMask");
    }
  };

  const onClaim = async () => {
    if (contract) {
      try {
        let txn = await contract.Claim();
        alert.info("Transction Submitted");
        await txn.wait();
        alert.success("Transaction Succesful");
        getUnclaimedRewards();
        getStakedNfts();
      } catch (err) {
        console.log(err);
        alert.error(err.error.message);
      }
    } else {
      alert.error("Connect To MetaMask");
    }
  };

  const getStakedNfts = async () => {
    if (contract && address) {
      try {
        let response = await contract.GetStakingMultiplier(address);
        setStakedNfts(response * 1);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getUnclaimedRewards = async () => {
    if (contract && address) {
      try {
        let response = await contract.CheckUnclaimedRewards(address);
        setUnclaimedRewards(response * 1);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUnclaimedRewards();
    getStakedNfts();
    const interval = setInterval(() => {
      getUnclaimedRewards();
      getStakedNfts();
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [contract, address]);

  const displayAdd = (add) => {
    return add.substring(0, 5) + "..." + add.substring(add.length - 4);
  };

  const parseRewards = () => {
    let num = unclaimedRewards / 10 ** 15 + "";
    if (num.length <= 3) return 0 + "." + num;
    return num.slice(0, num.length - 3) + "." + num.slice(num.length - 3);
  };

  return (
    <div className="wrapper">
      <div className="navbar">
        <div className="leftNavContainer">
          <div className="siteLogoContainer">
            <img src={logo} alt="logo" className="siteLogo"></img>
          </div>
          <div className="navLinks">
            <div className="navLink">
              <a href="#" className="link">
                Home
              </a>
            </div>
            <div className="navLink">
              <a href="#" className="link">
                Mint
              </a>
            </div>
          </div>
        </div>
        <div className="rightNavContainer">
          {!address ? (
            <div className="connectButton" tabIndex={1} onClick={connect}>
              Connect To Metamask
            </div>
          ) : (
            <div className="connectedAccount">
              {"Connected to " + displayAdd(address)}
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <div className="bgCircle1"></div>
        <div className="bgCircle2"></div>
        <div className="bgCircle3"></div>
        <div className="centerContainer">
          <div className="headerContainer">
            <div className="logoContainer">
              <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="heading">DASHBOARD</div>
          </div>
          <div className="register">
            <div
              className="registerButton"
              tabIndex={1}
              data-tip="Register NFTs for rewards"
              onClick={onRegister}
            >
              Register
            </div>
          </div>
          <div className="rewardsAndInfo">
            <div className="rewardsContainer">
              <div className="reward">
                {"Your unclaimed rewards : " + parseRewards()}
              </div>
              <div
                className="claimRewardsButton"
                data-tip="Claim Rewards"
                onClick={onClaim}
              >
                <img
                  src={claimRewardsIcon}
                  alt="claim rewards icon"
                  className="icon"
                />
              </div>
            </div>
            <div className="amountStaked">
              <div className="vaultContainer">
                <img src={vault} alt="vault icon" className="vault" />
                <div className="valueContainer">
                  {stakedNfts + " / 100 nodes"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip delayShow={1500} />
    </div>
  );
}

export default App;
