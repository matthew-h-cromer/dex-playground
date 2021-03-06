import styled from 'styled-components';
import TokenBalances from '../reusable/TokenBalances/TokenBalances';
import Actions from './Actions';
import { useRecoilValue } from 'recoil';

export default function ({ atom }) {
  const user = useRecoilValue(atom);

  return (
    <Container>
      <Title>{user.title}</Title>
      <TokenBalances user={user} />
      <Actions user={user} />
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
