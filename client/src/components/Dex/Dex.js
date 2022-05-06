import styled from 'styled-components';
import TokenBalance from '../reusable/TokenBalances/TokenBalances';
import TokenPrices from './TokenPrices';
import constTokens from '../../constants/tokens';

export default function () {
  const { T0, T1, 'T0-T1': T0T1LP } = constTokens;
  const tokens = [T0, T1, T0T1LP];

  return (
    <Container>
      <Title>Dex</Title>
      <TokenBalance
        user={{ address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9' }}
        tokens={tokens}
      />
      {/* <TokenPrices tokens={tokens} /> */}
    </Container>
  );
}

const Container = styled.div`
  color: black;
  background-color: #bfc8d6;
  width: 400px;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  padding: 1rem;
`;

const Title = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
  text-align: center;
`;
