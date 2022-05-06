import { useState } from 'react';
import styled from 'styled-components';
import { Select, Button, Input, Divider } from 'antd';

export default function () {
  const [action, setAction] = useState(null);

  return (
    <Container>
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
      {action == 'faucet' && <Input addonBefore='amount' />}
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
          <Button style={{ marginLeft: 'auto' }} type='primary' size='small'>
            Send Tx
          </Button>
        </Row>
      )}
    </Container>
  );
}

const Container = styled.div`
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
