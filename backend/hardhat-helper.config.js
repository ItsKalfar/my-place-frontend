require("dotenv").config();

const networkConfig = {
  default: {
    name: "hardhat",
    marketPlaceAddress: process.env.MYPLACE_CONTRACT_ADDRESS,
    totalSupply: ethers.utils.parseEther("10000000"),
    toeknAddress: process.env.ZETHER_CONTRACT_ADDRESS,
  },
  31337: {
    name: "localhost",
    marketPlaceAddress: process.env.MYPLACE_CONTRACT_ADDRESS,
    totalSupply: ethers.utils.parseEther("10000000"),
    toeknAddress: process.env.ZETHER_CONTRACT_ADDRESS,
  },
  80001: {
    name: "mumbai",
    marketPlaceAddress: process.env.MYPLACE_CONTRACT_ADDRESS,
    totalSupply: ethers.utils.parseEther("10000000"),
    toeknAddress: process.env.ZETHER_CONTRACT_ADDRESS,
  },
};

const developmentChains = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  developmentChains,
};
