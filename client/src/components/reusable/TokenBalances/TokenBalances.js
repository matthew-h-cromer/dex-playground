import styled from 'styled-components';
import Token from './Token';

export default function ({ user }) {
  return (
    <Container>
      <Title>Token Balances</Title>
      <Row>
        {Object.values(user.tokens).map(token => (
          <Token user={user} token={token} />
        ))}
      </Row>
    </Container>
  );
}

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
