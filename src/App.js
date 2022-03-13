import './App.css';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import logo from './assets/logo.png';
import stakeIcon from './assets/stake.png';
import withdrawIcon from './assets/withdraw.png';
import claimRewardsIcon from './assets/claimReward.png';
import vault from './assets/vault.png';
function App() {
  return (
    <div className='container'>
      <div className='bgCircle1'></div>
      <div className='bgCircle2'></div>
      <div className='bgCircle3'></div>
      <div className='centerContainer'>
        <div className='headerContainer'>
          <div className='logoContainer'>
            <img src={logo} className='logo'/>
          </div>
          <div className='heading'>DASHBOARD</div>
        </div>
        <div className='staking'>
          <input type='number' placeholder='Amount to stake' className='input'></input>
          <button className='button'><img src={stakeIcon} className='icon'/></button>
        </div>
        <div className='withdraw'>
          <input type='number' placeholder='Amount to withdraw' className='input'></input>
          <button className='button'><img src={withdrawIcon} className='icon'/></button>
        </div>
        <div className='rewardsAndInfo'>
          <div className='rewardsContainer'>
            <div className='reward'>Your Rewards : 100</div>
            <div className='claimRewardsButton'><img src={claimRewardsIcon} className='icon'/></div>
          </div>
          <div className='amountStaked'>
            <div className='vaultContainer'>
              <img src={vault} className='vault'/>
              <div className='valueContainer'>0 / 100 Staked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
