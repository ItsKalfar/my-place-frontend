const ethers = require("hardhat").ethers;
require("dotenv").config();

async function main() {
  const NFT = await ethers.getContractFactory("NFT");

  try {
    console.log("1) Deploying Contract----------------");
    const nft = await NFT.deploy(process.env.MYPLACE_CONTRACT_ADDRESS);
    await nft.deployed();
    console.log(`2) NFT contract deployed at ${nft.address} `);
  } catch (error) {
    console.log(`Deployment failed because... ${error}`);
  }
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
