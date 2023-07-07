import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Card, Space, Button } from 'antd';
import PDFViewer from '../../../components/PDFViewer/PDFViewer';
import { reviewDrawerSelector, closeReviewerDrawer, submitReviewThunk } from '../reviewsSlices';
import './ReviewDrawer.scss';


const ReviewDrawer = () => {
  const dispatch = useDispatch();
  const { reviewerDrawerShow, paperUrl, submission, submitting } = useSelector(reviewDrawerSelector);

  const closeViewer = () => {
    dispatch(closeReviewerDrawer());
  }

  const { title, conName, status, reviewDeadline, canReview, decision } = submission;

  const onApprove = () => {
    dispatch(submitReviewThunk({ decision: 'approve' }));
  };

  const onDecline = () => {
    dispatch(submitReviewThunk({ decision: 'decline' }));
  };

  return (
    <Drawer
      open={reviewerDrawerShow}
      onClose={closeViewer}
      className="review-drawer"
      width="70%"
    >
      <div className="review-drawer_container">
        <div className="review-drawer_info-container">
          <Space direction="vertical" size={16}>
            <Card className="review-drawer_card" title="Submission Info" size="small">
              <p>Title: {title}</p>
              <p>Conference: {conName}</p>
              <p>Review Deadline: {reviewDeadline}</p>
              <p>Decision: {decision}</p>
              <p>Status: {status}</p>
            </Card>
            {canReview ? (
              <>
                <Button
                  onClick={onApprove}
                  loading={submitting}
                  className="review-drawer_btn review-drawer_btn_safe"
                  type="primary"
                >
                  Approve
                </Button>
                <Button
                  onClick={onDecline}
                  loading={submitting}
                  className="review-drawer_btn"
                  type="primary"
                  danger
                >
                  Decline
                </Button>
              </>
            ) : null}
          </Space>
        </div>
        <PDFViewer url={paperUrl} />
      </div>
    </Drawer>
  )
};

export default ReviewDrawer;
