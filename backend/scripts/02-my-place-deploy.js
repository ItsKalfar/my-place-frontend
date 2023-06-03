const ethers = require("hardhat").ethers;
require("dotenv").config();

async function main() {
  const MyPlace = await ethers.getContractFactory("MyPlace");

  try {
    console.log("1) Deploying Contract----------------");
    const marketplace = await MyPlace.deploy(
      process.env.ZETHER_CONTRACT_ADDRESS
    );
    await marketplace.deployed();
    console.log(`2) Market place deployed at ${marketplace.address} `);
  } catch (error) {
    console.log(`Deployment failed because... ${error}`);
  }
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
