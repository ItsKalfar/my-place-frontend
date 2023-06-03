const ethers = require("hardhat").ethers;
require("dotenv").config();

async function main() {
  const Zether = await ethers.getContractFactory("Zether");

  try {
    console.log("1) Deploying Contract----------------");
    const token = await Zether.deploy();
    await token.deployed();
    console.log(`2) Token deployed at ${token.address} `);
  } catch (error) {
    console.log(`Deployment failed because... ${error}`);
  }
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
