import { useState } from 'react';
import styled from 'styled-components';
import { Select, Button, Input, Divider } from 'antd';
import { ethers } from 'ethers';
import constTokens from '../../constants/tokens';
import constContracts from '../../constants/contracts';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import userTokenBalance from '../../state/selectors/userTokenBalance';
import dexTokenBalances from '../../state/selectors/dexTokenBalances';

const { T0, T1 } = constTokens;
const { ROUTER, PAIR } = constContracts;

export default function ({ user }) {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [amount, setAmount] = useState(null);
  const [token0Amount, setToken0Amount] = useState(null);
  const [token1Amount, setToken1Amount] = useState(null);

  const refreshT0 = useRecoilRefresher_UNSTABLE(
    userTokenBalance({ userAddress: user.address, tokenSymbol: 'T0' })
  );
  const refreshT1 = useRecoilRefresher_UNSTABLE(
    userTokenBalance({ userAddress: user.address, tokenSymbol: 'T1' })
  );
  const refreshT0T1 = useRecoilRefresher_UNSTABLE(
    userTokenBalance({ userAddress: user.address, tokenSymbol: 'T0-T1' })
  );
  const refreshDex = useRecoilRefresher_UNSTABLE(dexTokenBalances);

  const handleSendTx = async () => {
    try {
      setLoading(true);

      const wallet = new ethers.Wallet(
        user.privateKey,
        ethers.getDefaultProvider('http://127.0.0.1:8545/')
      );

      // contracts
      const token0 = new ethers.Contract(T0.address, T0.abi, wallet);
      const token1 = new ethers.Contract(T1.address, T1.abi, wallet);
      const router = new ethers.Contract(ROUTER.address, ROUTER.abi, wallet);
      const pair = new ethers.Contract(PAIR.address, PAIR.abi, wallet);

      switch (action) {
        case 'faucet':
          if (tokenSymbol === 'T0') {
            await token0.faucet(amount);
            refreshT0();
          }
          if (tokenSymbol === 'T1') {
            await token1.faucet(amount);
            refreshT1();
          }
          break;
        case 'addLiquidity':
          await token0.approve(ROUTER.address, token0Amount);
          await token1.approve(ROUTER.address, token1Amount);

          await router.addLiquidity(
            T0.address, // tokenA
            T1.address, // tokenB
            token0Amount, // amountADesired
            token1Amount, // amountBDesired
            '0', // amountAMin
            '0', // amountBMin
            wallet.address, // to
            2000000000 // deadline
          );

          refreshT0();
          refreshT1();
          refreshT0T1();
          refreshDex();
          break;
        case 'removeLiquidity':
          await pair.approve(ROUTER.address, amount);

          await router.removeLiquidity(
            T0.address, // tokenA
            T1.address, // tokenB
            amount, // amount of liquidity to remove
            '0', // amountAMin
            '0', // amountBMin
            wallet.address, // to
            2000000000 // deadline
          );

          refreshT0();
          refreshT1();
          refreshT0T1();
          refreshDex();
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
          <Select placeholder='select a token' onChange={v => setTokenSymbol(v)}>
            <Select.Option value='T0'>T0</Select.Option>
            <Select.Option value='T1'>T1</Select.Option>
          </Select>
          <Input
            addonBefore='amount'
            onChange={e => setAmount(ethers.utils.parseEther(e.target.value))}
          />
        </>
      )}
      {action == 'addLiquidity' && (
        <>
          <Input
            addonBefore='token0 amount'
            onChange={e => setToken0Amount(ethers.utils.parseEther(e.target.value))}
          />
          <Input
            addonBefore='token1 amount'
            onChange={e => setToken1Amount(ethers.utils.parseEther(e.target.value))}
          />
        </>
      )}
      {action == 'removeLiquidity' && (
        <Input
          addonBefore='amount'
          onChange={e => setAmount(ethers.utils.parseEther(e.target.value))}
        />
      )}
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
        <Row style={{ marginTop: 'auto' }}>
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
  flex: 1;
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
