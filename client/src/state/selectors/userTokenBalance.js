import { selectorFamily } from 'recoil';
import { ethers } from 'ethers';
import constTokens from '../../constants/tokens';

export default selectorFamily({
  key: 'userTokenBalance',
  default: 0,
  get:
    ({ userAddress, tokenSymbol }) =>
    async ({ get }) => {
      const provider = ethers.getDefaultProvider('http://127.0.0.1:8545/');

      let amount;
      if (tokenSymbol === 'ETH') {
        amount = ethers.utils.formatEther(await provider.getBalance(userAddress));
      } else {
        const tokenContract = new ethers.Contract(
          constTokens[tokenSymbol].address,
          constTokens[tokenSymbol].abi,
          provider
        );
        amount = ethers.utils.formatEther(await tokenContract.balanceOf(userAddress));
      }

      const percent = (amount / 10000) * 100;

      return { amount, percent };
    },
});
