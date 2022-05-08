import styled from 'styled-components';

export default function () {
  return (
    <Container>
      <Title>Constant Product</Title>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  position: relative;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
