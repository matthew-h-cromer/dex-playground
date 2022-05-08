import { atom } from 'recoil';
import constTokens from '../../constants/tokens';

const { T0, T1 } = constTokens;

export default atom({
  key: 'dex',
  default: {
    title: 'Dex',
    tokens: { T0, T1 },
  },
});
