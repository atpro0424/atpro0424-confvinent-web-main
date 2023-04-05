import React from 'react';
import PDFViewer from "./PDFViewer";
import { Table } from 'antd';

const Reviews = () =>{
    const pdfURL = "https://arxiv.org/pdf/1812.10636.pdf";

    const dataSource = [
        {
          key: '1',
          deadline: '2023/01/15',
          conferences: "AAAI2023",
          title: 'Paper1',
          status: 'Submitted',
        },
        {
          key: '2',
          deadline: '2023/01/15',
          conferences: "ICCV2023",
          title: 'Paper2',
          status: 'Submitted',
        },
        {
            key: '3',
            deadline: '2023/01/15',
            conferences: "CVPR2023",
            title: 'Paper3',
            status: 'Submitted',
        }
      ];
    
    const columns = [
        {
          title: 'Deadline',
          dataIndex: 'deadline',
          key: 'deadline',
        },
        {
          title: 'Conferences',
          dataIndex: 'conferences',
          key: 'conferences',
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
    <div className="App">
        <h1>Reviews</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
    );
}

export default Reviews;