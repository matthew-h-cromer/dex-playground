import styled from 'styled-components';
import TokenDisplay from '../reusable/TokenBalances/TokenDisplay';
import dexTokenBalances from '../../state/selectors/dexTokenBalances';
import { useRecoilValueLoadable } from 'recoil';

export default function ({ dex }) {
  const { contents } = useRecoilValueLoadable(dexTokenBalances);

  const { token0, token1 } = contents ?? {};

  return (
    <Container>
      <Title>Token Balances</Title>
      <Row>
        <TokenDisplay
          token={{
            color: dex.tokens.T0.color,
            symbol: dex.tokens.T0.symbol,
            amount: token0?.amount,
            percent: token0?.percent,
          }}
        />
        <TokenDisplay
          token={{
            color: dex.tokens.T1.color,
            symbol: dex.tokens.T1.symbol,
            amount: token1?.amount,
            percent: token1?.percent,
          }}
        />
      </Row>
    </Container>
  );
}

const percent = v => (v / 10000) * 100;

const Container = styled.div`
  background-color: white;
  position: relative;
  height: 200px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  row-gap: 0.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
`;

const Row = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
`;

const Title = styled.div`
  position: absolute;
  top: -20px;
  left: 0.5rem;
  color: #474747;
  font-size: 12px;
`;
