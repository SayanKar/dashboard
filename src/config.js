export const CONTRACT_ADDRESS = "0x75e66366748F565a884180C3E9096aA528B6Bd7f";
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
export const LINK_MINTPAGE = "https://mint.1out100.com/";
export const LINK_HOMEPAGE = "https://1out100.com";
