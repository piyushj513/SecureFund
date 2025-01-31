import Web3 from 'web3';

let web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
      } catch (error) {
        console.log('Permission denied!');
      }
    }
  });
  web3 = new Web3(window.web3.currentProvider);
} else {
  console.log('a');
  //const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
  const provider = new Web3.providers.HttpProvider(
    'https://avalanche-fuji.infura.io/v3/9c202c23cfbd4cef83b89d85af52521f'
  );
  web3 = new Web3(provider);
}

export default web3;
