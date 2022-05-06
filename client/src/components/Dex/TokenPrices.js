import styled from 'styled-components';

export default function ({ tokens }) {
  return (
    <Container>
      {tokens.map(token => (
        <Balance>{`${token.symbol}: $${token.value}`}</Balance>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0.5rem 0rem 0.5rem;
  column-gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const Balance = styled.span``;
