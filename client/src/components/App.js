import styled from 'styled-components';
import User from './User/User';
import Dex from './Dex/Dex';

export default function () {
  const users = [
    {
      title: 'User 1',
      address: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      privateKey: '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    },
    {
      title: 'User 2',
      address: '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
      privateKey: '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
    },
  ];

  return (
    <Container>
      {users.map(user => (
        <User user={user} />
      ))}
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
