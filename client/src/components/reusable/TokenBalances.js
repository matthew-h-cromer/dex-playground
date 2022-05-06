import styled from 'styled-components';
import VerticalProgress from './VerticalProgress';

export default function ({ tokens }) {
  const colors = ['#118ab2', '#06d6a0', '#ef476f', '#ffd166'];

  return (
    <Container>
      <Title>Token Balances</Title>
      <Row style={{}}>
        {tokens.map((token, index) => (
          <VerticalProgress
            percent={token.percentValue}
            symbol={token.symbol}
            color={colors[index]}
          />
        ))}
      </Row>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  position: relative;
  flex: 200px 1;
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
  justify-content: center;
  column-gap: 2rem;
`;

const Title = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  color: #474747;
  font-size: 12px;
`;
