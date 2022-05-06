import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

export default function ({ user = {}, token = {} }) {
  const { symbol, address, abi, color } = token;

  const [amount, setAmount] = useState(0);

  const percent = (amount / 10000) * 100;

  useEffect(() => {
    getAmount();
    setInterval(getAmount, 1000);
  }, []);

  const getAmount = async () => {
    if (user.privateKey == null) return;

    const provider = ethers.getDefaultProvider('http://127.0.0.1:8545/');

    let amount = 0;
    if (symbol === 'ETH')
      amount = ethers.utils.formatEther(await provider.getBalance(user.address));
    else {
      const tokenContract = new ethers.Contract(address, abi, provider);
      amount = ethers.utils.formatEther(await tokenContract.balanceOf(user.address));
    }

    setAmount(amount);
  };

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
