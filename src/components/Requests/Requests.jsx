import React from 'react';
import { Table , Button , Modal} from 'antd';
import { useState } from 'react';

// 之后需要修改：
// 1. 点击Button之后需要调用showModal，需要传入一个参数（key）来唯一识别要调出哪一个request的Detail
// 2. 点击Approve或者Decline之后，需要对应修改status

const Requests = () => {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  // Need to link this data source to the data in the database.
  const dataSource = [
    {
      key: '1',
      time: '2023/01/15',
      type: "Review Reassign",
      from: 'aaron1@ur.rochester.com',
      status: 'Submitted',
    },
    {
      key: '2',
      time: '2023/01/11',
      type: "Review Reassign",
      from: 'aaron2@ur.rochester.com',
      status: 'Submitted',
    },
  ];

  const dataSourceInModal = [
    {
      key: '1',
      time: '2023/01/15',
      type: "Review Reassign",
      reason: 'I want to bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
    },
  ]

  const columnsInModal = [
    {
      title: 'Request Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    
  ]
  const columns = [
    {
      title: 'Request Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button onClick={showModal}>
            View Details
          </Button>
          <Modal
          open={open}
          title="Title"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="approve" type="primary" loading={loading} onClick={handleOk}>
              Approve
            </Button>,
            <Button
              key="decline"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Decline
            </Button>,
          ]}
          >
          <Table dataSource={dataSourceInModal} columns={columnsInModal} />
        </Modal>
        </div>
        
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    }
  ];

  return (
    <div>
      <h1>Requests</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Requests;