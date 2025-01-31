const hre = require('hardhat');

async function main() {
  const ProjectFactory = await hre.ethers.getContractFactory('ProjectFactory');
  const projectFactory = await ProjectFactory.deploy();

  await projectFactory.deployed();

  console.log('Factory deployed to:', projectFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
