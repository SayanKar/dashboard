#Dashboard for 1out100

This repo contains the frontend of 1out100 dashboard, where u can register nfts for rewards.

Before running make appropriate changes to the config file

```javascript
// Change the contract address to your address 
export const CONTRACT_ADDRESS = "0x1dA7E6d39d5E1fC09AcC26Fc4cBeE9871940B54a";

// Set the netwwork to rinkeby or fantom or any other network in NETWORKS_LIST
export const NETWORK = "rinkeby"; // "rinkeby" | "fantom"

// Make sure to put the updated abi in abi.js file
export { abi } from "./abi";

// Make sure the network u wanna deploy is in the NETWORKS_LIST object.
export const NETWORKS_LIST = {
  rinkeby: {
    chainId: "0x4",
    chainName: "rinkeby",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rinkeby.infura.io/v3/"],
  },
  fantom: {
    chainId: "0xFA",
    chainName: "fantom",
    nativeCurrency: {
      name: "fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpcapi.fantom.network/"],
  },
};

// Link to Minting site 
export const LINK_MINTPAGE = "https://1out100.com/mint";

// Link to Home page
export const LINK_HOMEPAGE = "https://1out100.com";
```

Tu run on local system follow the following steps:

1. Clone the repo, move in to the clone directory

```bash
git clone https://github.com/SayanKar/dashboard.git
cd dashboard
```

2. Install the packages, (you need to have node and npm installed)

```bash
npm install
```

3. Run the app in the development mode.

```bash
npm start
```

Open http://localhost:3000 to view it in your browser.



