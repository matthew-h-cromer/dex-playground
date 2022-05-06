import styled from 'styled-components';
import TokenBalance from '../reusable/TokenBalances';
import Actions from './Actions';

export default function () {
  const tokens = [
    { symbol: 'A', value: 50, percentValue: 20 },
    { symbol: 'B', value: 100, percentValue: 40 },
  ];

  return (
    <Container>
      <Title>User</Title>
      <TokenBalance tokens={tokens} />
      <Actions />
    </Container>
  );
}

const Container = styled.div`
  color: black;
  background-color: #ededed;
  width: 400px;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem;
`;

const Title = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
  text-align: center;
`;
