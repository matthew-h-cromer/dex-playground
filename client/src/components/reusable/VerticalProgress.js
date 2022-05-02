import styled from 'styled-components';

export default function ({ percent, color }) {
  return (
    <Container>
      <Progress percent={percent} color={color} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  background-color: #0000000a;
  width: 8px;
  height: 100%;
  border-radius: 4px;
`;

const Progress = styled.div`
  background-color: ${({ color }) => color ?? '#1890ff'};
  position: absolute;
  width: 8px;
  height: ${({ percent }) => percent ?? '0'}%;
  bottom: 0;
  left: 0;
  border-radius: 4px;
`;
