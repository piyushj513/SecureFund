import React from 'react';
import { Button } from 'semantic-ui-react';
import { useState } from 'react';
import { ethers } from 'ethers';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Metamask = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const router = useRouter();

  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any'
      );
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });
      const account = provider.getSigner();
      const Address = await account.getAddress();
      setAddress(Address);
      const Balance = ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance);
    } else {
      router.push(
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
      );
    }
  };

  return (
    <div>
      <Button inverted color="blue" onClick={connectWallet}>
        {balance == '' ? 'Connect' : <p>{balance.slice(0, 4)} Ether</p>}
      </Button>
    </div>
  );
};

export default Metamask;
