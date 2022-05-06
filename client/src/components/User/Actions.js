import { useState, useRef } from 'react';
import styled from 'styled-components';
import { Select, Button, Input, Divider } from 'antd';
import { ethers } from 'ethers';
import constTokens from '../../constants/tokens';

const { ETH, T0, T1, 'T0-T1': T0T1LP } = constTokens;

export default function ({ user }) {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);
  const [token, setToken] = useState(null);
  const [amount, setAmount] = useState(null);

  const handleSendTx = async () => {
    try {
      setLoading(true);

      const wallet = new ethers.Wallet(
        user.privateKey,
        ethers.getDefaultProvider('http://127.0.0.1:8545/')
      );

      switch (action) {
        case 'faucet':
          if (token === 'token0') {
            const token0 = new ethers.Contract(T0.address, T0.abi, wallet);
            await token0.faucet(amount);
          }
          if (token === 'token1') {
            const token1 = new ethers.Contract(T1.address, T1.abi, wallet);
            await token1.faucet(amount);
          }
          break;
        default:
          return;
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Actions</Title>
      <Row>
        <Select
          placeholder='select an action'
          style={{ width: '100%' }}
          onChange={v => setAction(v)}>
          <Select.Option value='faucet'>faucet</Select.Option>
          <Select.Option value='addLiquidity'>addLiquidity</Select.Option>
          <Select.Option value='removeLiquidity'>removeLiquidity</Select.Option>
          <Select.Option value='swap'>swap</Select.Option>
        </Select>
      </Row>
      {action && <Divider style={{ margin: '6px 0' }} />}
      {action == 'faucet' && (
        <>
          <Select placeholder='select a token' onChange={v => setToken(v)}>
            <Select.Option value='token0'>token0</Select.Option>
            <Select.Option value='token1'>token1</Select.Option>
          </Select>
          <Input
            addonBefore='amount'
            onChange={e => setAmount(ethers.utils.parseEther(e.target.value))}
          />
        </>
      )}
      {action == 'addLiquidity' && (
        <>
          <Input addonBefore='token0 amount' />
          <Input addonBefore='token1 amount' />
        </>
      )}
      {action == 'removeLiquidity' && <Input addonBefore='amount' />}
      {action == 'swap' && (
        <>
          <Select>
            <Select.Option>token0 for token1</Select.Option>
            <Select.Option>token1 for token0</Select.Option>
          </Select>
          <Input addonBefore='amount' />
        </>
      )}
      {action && (
        <Row>
          <Button
            loading={loading}
            style={{ marginLeft: 'auto' }}
            type='primary'
            size='small'
            onClick={handleSendTx}>
            Send Tx
          </Button>
        </Row>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 0.5rem;
  row-gap: 0.5rem;
  display: flex;
  flex-direction: column;
  column-gap: 0.5rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.5rem;
  color: #474747;
  font-size: 12px;
`;

const Title = styled.div`
  position: absolute;
  top: -20px;
  left: 0.5rem;
  color: #474747;
  font-size: 12px;
`;
