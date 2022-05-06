import styled from 'styled-components';
import TokenBalance from '../reusable/TokenBalances';
import TokenPrices from './TokenPrices';

export default function () {
  const tokens = [
    { symbol: 'T0', address: null, color: '#06d6a0', amount: 1, value: 0, percent: 5 },
    { symbol: 'T1', address: null, color: '#ef476f', amount: 2, value: 0, percent: 5 },
    { symbol: 'T0-T1', address: null, color: '#ffd166', amount: 3, value: 0, percent: 5 },
  ];

  return (
    <Container>
      <Title>Dex</Title>
      <TokenBalance tokens={tokens} />
      <TokenPrices tokens={tokens} />
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
