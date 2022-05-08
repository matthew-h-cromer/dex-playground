import { atom } from 'recoil';
import constTokens from '../../constants/tokens';

export default atom({
  key: 'user2',
  default: {
    title: 'User 2',
    address: '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    privateKey: '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
    tokens: constTokens,
  },
});
