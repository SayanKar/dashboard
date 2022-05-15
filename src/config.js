export const CONTRACT_ADDRESS = "0xad1eefba627c62ca534030b5ee2350763e6e30fe";
export const NETWORK = "rinkeby"; // "rinkeby" | "fantom"
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
