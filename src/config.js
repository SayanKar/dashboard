export const CONTRACT_ADDRESS = "0x5d22DC1a3E031Fb7392170AeC0193256877bE913";
export const NETWORK = "fantom"; // "rinkeby" | "fantom"
export { abi } from "./abi";
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
    rpcUrls: ["https://rpc.ftm.tools/"],
  },
};
export const LINK_MINTPAGE = "https://1out100.com/mint";
export const LINK_HOMEPAGE = "https://1out100.com";
