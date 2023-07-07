import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import {
  openNewSubmissionModal,
  getSubmissionsTunk,
  submissionsSelector,
  getSubmisssionThunk,
} from './submissionsSlice';
import NewSubmissionModal from './components/NewSubmissionModal';
import SubmissionViewDrawer from './components/SubmissionViewDrawer';
import './Submissions.scss';

const Submissions = () => {
  const dispatch = useDispatch();
  const { submissions } = useSelector(submissionsSelector);

  useEffect(() => {
    dispatch(getSubmissionsTunk());
  }, [dispatch]);

  const onNewSubmissionClicked = () => {
    dispatch(openNewSubmissionModal());
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Conference Name',
      dataIndex: 'conName',
      key: 'conName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => {
          dispatch(getSubmisssionThunk(record.subId));
        }}>View</Button>
      )
    }
  ];

  return (
    <div className="submissions">
      <SubmissionViewDrawer />
      <NewSubmissionModal />
      <div className="submissions_btn-container">
        <Button type="primary" onClick={onNewSubmissionClicked}>New Submission</Button>
      </div>
      <Table rowKey="subId" columns={columns} dataSource={submissions} />
    </div>
  );
};

export default Submissions;