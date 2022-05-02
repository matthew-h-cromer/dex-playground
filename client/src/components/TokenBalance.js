import styled from 'styled-components';
import VerticalProgress from './reusable/VerticalProgress';

export default function ({ tokens }) {
  return (
    <Container>
      {tokens.map(token => (
        <VerticalProgress percent={token.percentValue} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  column-gap: 0.5rem;
`;
