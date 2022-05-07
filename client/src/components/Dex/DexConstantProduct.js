import { useEffect, useState } from 'react';
import styled from 'styled-components';
import constContracts from '../../constants/contracts';
import { ethers } from 'ethers';

const { PAIR } = constContracts;

export default function ({ T0, T1 }) {
  const [constantProduct, setConstantProduct] = useState();

  useEffect(() => {
    getConstantProduct();
    // setInterval(getReserves, 1000);
  }, []);

  const getConstantProduct = async () => {
    const provider = ethers.getDefaultProvider('http://127.0.0.1:8545/');

    const pair = new ethers.Contract(PAIR.address, PAIR.abi, provider);

    const price0CumulativeLast = await pair.price0CumulativeLast();
    const price1CumulativeLast = await pair.price1CumulativeLast();
    const k = price1CumulativeLast / price0CumulativeLast;

    setConstantProduct(`1 * ${price1CumulativeLast} = ${k}`);
  };

  return (
    <Container>
      <Title>Constant Product</Title>
      {/* {constantProduct} */}
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  position: relative;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
