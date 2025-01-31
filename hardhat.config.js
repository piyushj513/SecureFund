require('@nomiclabs/hardhat-waffle');
require('dotenv').config({ path: './.env.local' });

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
//const privateKey = 'bc979e575e01f8c3a527dfb5027bfbecfe7d705ba5fb5582d913dd6113b4631b' //ganche wallet private key
console.log(process.env.NEXT_PUBLIC_RPC_URL);
module.exports = {
  solidity: '0.8.9',
  defaultNetwork: 'fuji',
  networks: {
    hardhat: {},
    fuji: {
      url: process.env.NEXT_PUBLIC_RPC_URL,
      accounts: [privateKey],
    },
  },
};

/*
 module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "ganache",
  networks: {
    hardhat: {},
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [privateKey]
    }
  }
};
*/
