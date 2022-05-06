import styled from 'styled-components';
import User from './User/User';
import Dex from './Dex/Dex';

export default function () {
  return (
    <Container>
      <User />
      <Dex />
    </Container>
  );
}

const Container = styled.div`
  background-color: #474747;
  color: white;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
  row-gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
`;
