import styled from 'styled-components';
import { Table } from 'antd';
import ParsedAddress from '../reusable/ParsedAddress';

export default function ({ params = [] }) {
  const columns = [
    { title: 'name', dataIndex: 'name' },
    { title: 'type', dataIndex: 'type' },
    {
      title: 'value',
      render: _ => (_.type === 'address' ? <ParsedAddress address={_.value} /> : _.value),
    },
  ];

  return (
    <Container>
      <Title>Params</Title>
      <Table size='small' dataSource={params} columns={columns} pagination={false} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #ededed;
  border-radius: 4px;
`;

const Title = styled.div`
  width: 100%;
  color: white;
  background-color: #474747;
  text-align: center;
  border-radius: 4px 4px 0 0;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Value = styled.div`
  overflow: hidden;
  border-left: 1px solid grey;
  border-top: 1px solid grey;
  padding: 4px 8px;
`;
