require("dotenv").config();

const networkConfig = {
  default: {
    name: "hardhat",
    marketPlaceAddress: process.env.MYPLACE_CONTRACT_ADDRESS,
  },
  31337: {
    name: "localhost",
    marketPlaceAddress: process.env.MYPLACE_CONTRACT_ADDRESS,
  },
  5: {
    name: "goerli",
    marketPlaceAddress: process.env.MYPLACE_CONTRACT_ADDRESS,
  },
};

const developmentChains = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  developmentChains,
};
