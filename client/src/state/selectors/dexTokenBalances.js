import { selector } from 'recoil';
import { ethers } from 'ethers';
import constContracts from '../../constants/contracts';

const { PAIR } = constContracts;

export default selector({
  key: 'dexTokenBalances',
  get: async () => {
    const provider = ethers.getDefaultProvider('http://127.0.0.1:8545/');

    const pair = new ethers.Contract(PAIR.address, PAIR.abi, provider);

    const reserves = await pair.getReserves();

    const [t0Reserve, t1Reserve, blockTimestampLast] = reserves;

    const t0Amount = ethers.utils.formatEther(t0Reserve);
    const t1Amount = ethers.utils.formatEther(t1Reserve);

    return {
      token0: {
        amount: t0Amount,
        percent: (t0Amount / 10000) * 100,
      },
      token1: {
        amount: t1Amount,
        percent: (t1Amount / 10000) * 100,
      },
    };
  },
});
