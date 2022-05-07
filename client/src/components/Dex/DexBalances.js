import { useEffect, useState } from 'react';
import styled from 'styled-components';
import constContracts from '../../constants/contracts';
import { ethers } from 'ethers';
import TokenDisplay from '../reusable/TokenBalances/TokenDisplay';

const { PAIR } = constContracts;

export default function ({ T0, T1 }) {
  const [token0Amount, setToken0Amount] = useState(null);
  const [token1Amount, setToken1Amount] = useState(null);

  useEffect(() => {
    getReserves();
    setInterval(getReserves, 1000);
  }, []);

  const getReserves = async () => {
    const provider = ethers.getDefaultProvider('http://127.0.0.1:8545/');

    const pair = new ethers.Contract(PAIR.address, PAIR.abi, provider);

    const reserves = await pair.getReserves();

    const [t0Reserve, t1Reserve, blockTimestampLast] = reserves;

    setToken0Amount(ethers.utils.formatEther(t0Reserve));
    setToken1Amount(ethers.utils.formatEther(t1Reserve));
  };

  return (
    <Container>
      <Title>Token Balances</Title>
      <Row>
        <TokenDisplay
          percent={percent(token0Amount)}
          color={T0.color}
          symbol={T0.symbol}
          amount={token0Amount}
        />
        <TokenDisplay
          percent={percent(token1Amount)}
          color={T1.color}
          symbol={T1.symbol}
          amount={token1Amount}
        />
      </Row>
    </Container>
  );
}

const percent = v => (v / 10000) * 100;

const Container = styled.div`
  background-color: white;
  position: relative;
  height: 200px;
  display: flex;
  flex-direction: column;
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
