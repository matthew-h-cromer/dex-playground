import styled from 'styled-components';
import User from './User/User';
import Dex from './Dex/Dex';
import { Row, Col } from 'antd';
import user1 from '../state/atoms/user1';
import user2 from '../state/atoms/user2';

export default function () {
  const userAtoms = [user1, user2];

  return (
    <Container>
      <Row gutter={24} justify='center'>
        {userAtoms.map(atom => (
          <Col>{<User atom={atom} />}</Col>
        ))}
        <Col>
          <Dex />
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
}

const Container = styled.div`
  background-color: #474747;
  color: white;
  height: 100vh;
  width: 100vw;
  padding: 24px;
  box-sizing: border-box;
`;
