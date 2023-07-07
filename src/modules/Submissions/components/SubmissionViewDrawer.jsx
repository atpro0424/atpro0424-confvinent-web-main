import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Card, Space } from 'antd';
import {
  submissionViewDrawerSelector,
  closeSubmissionDrawerModal,
} from '../submissionsSlice';
import PDFViewer from '../../../components/PDFViewer/PDFViewer';
import './SubmissionViewDrawer.scss';


const SubmissionViewDrawer = () => {
  const dispatch = useDispatch();
  const { submissionViewDrawerShow, submissionUrl, viewingSubmission } = useSelector(submissionViewDrawerSelector);
  const { conName, title, status, authors } = viewingSubmission;

  const closeViewer = () => {
    dispatch(closeSubmissionDrawerModal());
  }

  return (
    <Drawer
      open={submissionViewDrawerShow}
      onClose={closeViewer}
      className="submission-view-drawer"
      width="70%"
    >
      <div className="submission-view-drawer_container">
        <div className="submission-view-drawer_info-container">
          <Space direction="vertical" size={16}>
            <Card className="submission-view-drawer_card" title="Submission Info" size="small">
              <p>Title: {title}</p>
              <p>Conference: {conName}</p>
              <p>Status: {status}</p>
            </Card>
            {authors.map(author => (
              <Card className="submission-view-drawer_card" title={`${author.firstName} ${author.lastName}`} size="small">
                <p>Email: {author.email}</p>
                <p>Organization: {author.organization}</p>
                <p>Address: {author.address}</p>
              </Card>
            ))}
          </Space>
        </div>
        <PDFViewer url={submissionUrl} />
      </div>
    </Drawer>
  )
};

export default SubmissionViewDrawer;
