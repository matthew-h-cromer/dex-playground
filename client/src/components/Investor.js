import styled from 'styled-components';
import TokenBalance from './TokenBalance';
import { Input, Button } from 'antd';

export default function () {
  const tokens = [
    { symbol: 'A', value: 50, percentValue: 20 },
    { symbol: 'B', value: 100, percentValue: 40 },
  ];

  return (
    <Container>
      <Title>Investor</Title>
      <TokenBalance tokens={tokens} />
      <ButtonsContainer>
        <Input />
        <Button>Fund A and B</Button>
      </ButtonsContainer>
    </Container>
  );
}

const Container = styled.div`
  color: black;
  background-color: #fafafa;
  height: 400px;
  width: 400px;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

const Title = styled.div`
  width: 100%;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0.5rem 0rem 0.5rem;
  column-gap: 0.5rem;
`;
