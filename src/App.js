import "./App.css";
import { HiPlus, HiMinus } from "react-icons/hi";
import ReactTooltip from "react-tooltip";
import logo from "./assets/logo.png";
import stakeIcon from "./assets/stake.png";
import withdrawIcon from "./assets/withdraw.png";
import claimRewardsIcon from "./assets/claimReward.png";
import vault from "./assets/vault.png";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "./abi.js";
import { useAlert } from "react-alert";

const CONTRACT_ADDRESS = "0x03BB8fee8D33Af220279aB300B28327f3fD71234";

function App() {
  const alert = useAlert();
  const [stakeAmount, setStakeAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [unclaimedRewards, setUnclaimedRewards] = useState(0);
  const [stakedNfts, setStakedNfts] = useState(0);
  const [contract, setContract] = useState();
  const [address, setAddress] = useState();

  async function connect() {
    console.log("connectCalled");
    if (typeof window.ethereum === "undefined") {
      console.log("MetaMask is not installed!");
      alert.error("Couldn't find MetaMask");
    } else {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
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

  const onStake = async () => {
    if (contract) {
      if (stakeAmount === "") {
        alert.error("Stake amount can be Integers between 1 to 100");
        return;
      }
      try {
        let txn = await contract.Stake(parseInt(stakeAmount));
        alert.info("Transction Submitted");
        await txn.wait();
        alert.success("Transaction Succesull");
        setStakeAmount("");
        getUnclaimedRewards();
        getStakedNfts();
      } catch (err) {
        console.log(err);
        alert.error(err);
      }
    } else {
      alert.error("Connect To MetaMask");
    }
  };

  const onWithdraw = async () => {
    if (contract) {
      if (withdrawAmount === "") {
        alert.error("Withdraw amount can be Integers between 1 to 100");
        return;
      }
      try {
        let txn = await contract.Withdraw(parseInt(withdrawAmount));
        alert.info("Transction Submitted");
        await txn.wait();
        alert.success("Transaction Succesull");
        setWithdrawAmount("");
        getUnclaimedRewards();
        getStakedNfts();
      } catch (err) {
        console.log(err);
        alert.error(err);
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
        alert.success("Transaction Succesull");
        getUnclaimedRewards();
        getStakedNfts();
      } catch (err) {
        console.log(err);
        alert.error(err);
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
        let response = await contract.GetUnclaimedRewards(address);
        setUnclaimedRewards(response * 1);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUnclaimedRewards();
    getStakedNfts();
  }, [contract, address]);

  const onStakeAmountChange = (value) => {
    if (value === "") setStakeAmount("");
    else if (!isNaN(value) && value >= 1 && value <= 100)
      setStakeAmount(parseInt(value));
  };

  const onWithdrawAmountChange = (value) => {
    if (value === "") setWithdrawAmount("");
    else if (!isNaN(value) && value >= 1 && value <= 100)
      setWithdrawAmount(parseInt(value));
  };

  const incVal = (idx) => {
    if (idx === 1) {
      onWithdrawAmountChange(withdrawAmount + 1);
    } else {
      onStakeAmountChange(stakeAmount + 1);
    }
  };

  const decVal = (idx) => {
    if (idx === 1) {
      onWithdrawAmountChange(withdrawAmount - 1);
    } else {
      onStakeAmountChange(stakeAmount - 1);
    }
  };

  const displayAdd = (add) => {
    return add.substring(0, 5) + "..." + add.substring(add.length - 4);
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
            <div className="connectButton" tabIndex="1" onClick={connect}>
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
          <div className="staking">
            <div className="plus" tabIndex={1} onClick={() => incVal(0)}>
              <HiPlus className="plusIcon" />
            </div>
            <div className="minus" tabIndex={1} onClick={() => decVal(0)}>
              <HiMinus className="minusIcon" />
            </div>
            <input
              type="text"
              placeholder="Amount to stake"
              className="input"
              value={stakeAmount}
              onChange={(e) => onStakeAmountChange(e.target.value)}
            ></input>
            <button
              className="button"
              data-tip="Stake"
              tabIndex={2}
              onClick={onStake}
            >
              <img src={stakeIcon} alt="stake icon" className="icon" />
            </button>
          </div>
          <div className="withdraw">
            <div className="plus" tabIndex={1} onClick={() => incVal(1)}>
              <HiPlus className="plusIcon" />
            </div>
            <div className="minus" tabIndex={1} onClick={() => decVal(1)}>
              <HiMinus className="minusIcon" />
            </div>
            <input
              type="text"
              placeholder="Amount to withdraw"
              className="input"
              value={withdrawAmount}
              onChange={(e) => onWithdrawAmountChange(e.target.value)}
            ></input>
            <button
              className="button"
              data-tip="Withdraw"
              tabIndex={3}
              onClick={onWithdraw}
            >
              <img src={withdrawIcon} alt="withdraw icon" className="icon" />
            </button>
          </div>
          <div className="rewardsAndInfo">
            <div className="rewardsContainer">
              <div className="reward">
                {"Your unclaimed rewards : " + unclaimedRewards}
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
                  {stakedNfts + " / 100 Staked"}
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
