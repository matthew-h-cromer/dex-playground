import { atom } from 'recoil';
import constTokens from '../../constants/tokens';

export default atom({
  key: 'user1',
  default: {
    title: 'User 1',
    address: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    privateKey: '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    tokens: constTokens,
  },
});
