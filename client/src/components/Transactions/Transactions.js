import styled from 'styled-components';
import _transactions from '../../state/atoms/transactions';
import { useRecoilValue } from 'recoil';
import { List } from 'antd';
import Logs from './Logs';
import Params from './Params';

export default function () {
  const transactions = useRecoilValue(_transactions);

  return (
    <StyledList
      itemLayout='horizontal'
      bordered
      dataSource={transactions}
      renderItem={t => (
        <StyledListItem>
          <Title>{t.name}</Title>
          <Params params={t.params} />
          <Logs logs={t.logs} />
        </StyledListItem>
      )}
    />
  );
}

const StyledList = styled(List)`
  width: 100%;
  background-color: white;
  border-radius: 8px;
`;

const StyledListItem = styled(List.Item)`
  position: relative;
  display: grid;
  grid-template: 1fr / minmax(0, 1fr) minmax(0, 1fr);
  column-gap: 1rem;
  padding: 34px 12px 12px 12px;
  border-radius: 8px;
`;

const Title = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  font-weight: bold;
  color: #474747;
`;
