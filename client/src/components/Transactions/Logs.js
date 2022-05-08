import styled from 'styled-components';
import { Table } from 'antd';

export default function ({ logs }) {
  const logColumns = [
    { title: 'name', dataIndex: 'name' },
    {
      title: 'events',
      dataIndex: 'events',
      render: events => (
        <Table size='small' dataSource={events} columns={eventColumns} pagination={false} />
      ),
    },
  ];

  const eventColumns = [
    { title: 'name', dataIndex: 'name' },
    { title: 'value', dataIndex: 'value' },
  ];

  return (
    <Container>
      <Title>Logs</Title>
      <Table size='small' dataSource={logs} columns={logColumns} pagination={false} />
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

const Log = styled.div`
  display: flex;
  flex-direction: row;
`;

const Events = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid grey;
`;

const Value = styled.div`
  overflow: hidden;
  border-left: 1px solid grey;
  padding: 4px 8px;
`;
