import { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function ({ token }) {
  const [_token, setToken] = useState(token);

  useEffect(() => {
    if (token == null) return;

    setToken({
      amount: token.amount ?? _token.amount,
      percent: token.percent ?? _token.percent,
      symbol: token.symbol ?? _token.symbol,
      color: token.color ?? _token.color,
    });
  }, [token]);

  const { amount, percent, symbol, color } = _token;

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
  if (amount == null) return ' ';

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
  width: 50px;
`;
