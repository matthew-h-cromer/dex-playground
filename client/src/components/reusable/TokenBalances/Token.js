import userTokenBalance from '../../../state/selectors/userTokenBalance';
import { useRecoilValueLoadable } from 'recoil';
import TokenDisplay from './TokenDisplay';

export default function ({ user, token }) {
  const { contents } = useRecoilValueLoadable(
    userTokenBalance({ userAddress: user.address, tokenSymbol: token.symbol })
  );

  const { amount, percent } = contents;

  return <TokenDisplay token={{ ...token, amount, percent }} />;
}
