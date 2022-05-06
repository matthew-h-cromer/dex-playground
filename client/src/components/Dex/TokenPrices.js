import styled from 'styled-components';

export default function ({ tokens }) {
  return (
    <Container>
      <Title>Token Prices</Title>
      {tokens.map(token => (
        <Balance>{`${token.symbol}: $${token.value}`}</Balance>
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0.5rem 0rem 0.5rem;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 0.5rem;
`;

const Balance = styled.span``;

const Title = styled.div`
  position: absolute;
  top: -20px;
  left: 0.5rem;
  color: #474747;
  font-size: 12px;
`;
