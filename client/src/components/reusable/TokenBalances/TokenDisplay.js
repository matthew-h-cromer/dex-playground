import styled from 'styled-components';

export default function ({ percent, color, symbol, amount }) {
  return (
    <Container>
      <Bar>
        <Progress percent={percent} color={color} />
      </Bar>
      <SubTitle>{`${symbol}\n${formatAmount(amount)}`}</SubTitle>
    </Container>
  );
}

const formatAmount = amount => {
  if (amount == null) return '';

  return parseFloat(amount).toFixed(1);
};

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
  transition-duration: 1s;
  bottom: 0;
  left: 0;
  border-radius: 6px;
`;

const SubTitle = styled.div`
  white-space: pre-wrap;
`;
