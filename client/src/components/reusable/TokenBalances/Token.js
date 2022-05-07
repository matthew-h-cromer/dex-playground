import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TokenDisplay from './TokenDisplay';

export default function ({ user = {}, token = {} }) {
  const { symbol, address, abi, color } = token;

  const [amount, setAmount] = useState(0);

  const percent = (amount / 10000) * 100;

  useEffect(() => {
    getAmount();
    setInterval(getAmount, 1000);
  }, []);

  const getAmount = async () => {
    if (user.privateKey == null) return;

    const provider = ethers.getDefaultProvider('http://127.0.0.1:8545/');

    let amount = 0;
    if (symbol === 'ETH')
      amount = ethers.utils.formatEther(await provider.getBalance(user.address));
    else {
      const tokenContract = new ethers.Contract(address, abi, provider);
      amount = ethers.utils.formatEther(await tokenContract.balanceOf(user.address));
    }

    setAmount(amount);
  };

  return <TokenDisplay percent={percent} color={color} symbol={symbol} amount={amount} />;
}
