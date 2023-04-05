import React  from 'react';
import { Table } from 'antd';
import PDFViewer from '../../components/PDFViewer/PDFViewer';

const Submissions = () => {
  const pdfURL = "https://arxiv.org/pdf/1812.10636.pdf";

  // Need to link this data source to the data in the database.
  const dataSource = [
    {
      key: '1',
      deadline: '2023/01/15',
      conference: "AAAI2023",
      title: 'Paper 1',
      status: 'Accepted',
    },
    {
      key: '2',
      deadline: '2023/01/15',
      conference: "ICCV2023",
      title: 'Paper 2',
      status: 'Submitted',
    },
    {
      key: '3',
      deadline: '2023/01/15',
      conference: "CVPR2023",
      title: 'Paper 3',
      status: 'Draft',
    },
  ];


  const columns = [
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: 'Conference',
      dataIndex: 'conference',
      key: 'conference',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <div>
        <PDFViewer pdfUrl={pdfURL} />
        </div>
      ),
    }

  ];

  return (
    <div>
    <div>
      <h1>Current Submissions</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
    <div>
      <h1>Past Submissions</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
    </div>
  );
};

export default Submissions;