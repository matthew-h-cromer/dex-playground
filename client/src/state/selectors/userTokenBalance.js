import { selectorFamily, selector } from 'recoil';
import { ethers } from 'ethers';

export default selectorFamily({
  key: 'userTokenBalance',
  default: 0,
  get:
    ({ user, token }) =>
    async ({ get }) => {
      const { symbol, address, abi } = token;

      const provider = ethers.getDefaultProvider('http://127.0.0.1:8545/');

      let amount;
      if (symbol === 'ETH') {
        amount = ethers.utils.formatEther(await provider.getBalance(user.address));
      } else {
        const tokenContract = new ethers.Contract(address, abi, provider);
        amount = ethers.utils.formatEther(await tokenContract.balanceOf(user.address));
      }

      const percent = (amount / 10000) * 100;

      return { amount, percent };
    },
});
