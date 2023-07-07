import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import { getReviewsThunk, reviewsSelector, openReivewDrawer } from './reviewsSlices';
import ReviewDrawer from './components/ReviewDrawer';

const Reviews = () => {
  const dispatch = useDispatch();
  const { reviews, reviewTableLoading } = useSelector(reviewsSelector);

  useEffect(() => {
    dispatch(getReviewsThunk());
  }, [dispatch]);

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
      title: 'Review Deadline',
      dataIndex: 'reviewDeadline',
      key: 'reviewDeadline',
    },
    {
      title: 'Decision',
      dataIndex: 'decision',
      key: 'decision',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      key: 'canReview',
      dataIndex: 'canReview',
      width: 10,
      render: (val, entry) => (
        <Button onClick={() => { dispatch(openReivewDrawer(entry.subId)) }}>{val ? 'Review' : 'View'}</Button>
      )
    }
  ];

  return (
    <div>
      <ReviewDrawer />
      <Table loading={reviewTableLoading} columns={columns} rowKey="subId" dataSource={reviews} />
    </div>
  )
};

export default Reviews;
