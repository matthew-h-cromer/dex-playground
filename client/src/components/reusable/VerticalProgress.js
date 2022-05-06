import styled from 'styled-components';

export default function ({ percent, color, symbol }) {
  return (
    <Container>
      <Bar>
        <Progress percent={percent} color={color} />
      </Bar>
      {symbol}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const Bar = styled.div`
  position: relative;
  background-color: #0000000a;
  width: 12px;
  flex: 1;
  border-radius: 6px;
`;

const Progress = styled.div`
  background-color: ${({ color }) => color ?? '#1890ff'};
  position: absolute;
  width: 12px;
  height: ${({ percent }) => percent ?? '0'}%;
  bottom: 0;
  left: 0;
  border-radius: 6px;
`;
