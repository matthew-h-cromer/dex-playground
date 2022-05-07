import styled from 'styled-components';
import constTokens from '../../constants/tokens';
import DexBalances from './DexBalances';
import DexConstantProduct from './DexConstantProduct';

export default function () {
  const { T0, T1 } = constTokens;
  const tokens = [T0, T1];

  return (
    <Container>
      <Title>Dex</Title>
      <DexBalances T0={T0} T1={T1} />
      <DexConstantProduct T0={T0} T1={T1} />
    </Container>
  );
}

const Container = styled.div`
  color: black;
  background-color: #ededed;
  width: 400px;
  min-height: 500px;
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
