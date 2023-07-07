import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, DatePicker, Descriptions } from 'antd';
import {
  getCurrentConferenceThunk,
  createConferenceThunk,
  conferenceSelector,
  deleteConferenceThunk,
} from './conferenceSlice';

const Conferences = () => {
  const dispatch = useDispatch();
  const { curConference, loadingCurrentConf, submitting } = useSelector(conferenceSelector);

  useEffect(() => {
    dispatch(getCurrentConferenceThunk());
  }, [dispatch]);

  const onFinish = (values) => {
    dispatch(createConferenceThunk(values));
  };

  const deleteCurrentConference = () => {
    dispatch(deleteConferenceThunk());
  };

  if (curConference) {
    const { name, createTime, endTime, reviewDeadline, submitDeadline, reviewNumberForEachPaper } = curConference;

    return (
      <div>
        <Descriptions title={name}>
          <Descriptions.Item label="Create Time">{createTime}</Descriptions.Item>
          <Descriptions.Item label="Submit Deadline">{submitDeadline}</Descriptions.Item>
          <Descriptions.Item label="Review Deadline">{reviewDeadline}</Descriptions.Item>
          <Descriptions.Item label="End Time">{endTime}</Descriptions.Item>
          <Descriptions.Item label="Reviewer number of each paper">{reviewNumberForEachPaper}</Descriptions.Item>
        </Descriptions>
        <Button onClick={deleteCurrentConference}>Terminate this conference</Button>
      </div>
    );
  }

  return (
    <Form
      name="conference"
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      style={{maxWidth: 600}}
      onFinish={onFinish}
    >
      <Form.Item
        label="Conference Name"
        name="name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        label="Submit Deadline"
        name="submitDeadline"
        rules={[{ required: true }]}
      >
        <DatePicker showTime />
      </Form.Item>
      
      <Form.Item 
        label="Review Deadline"
        name="reviewDeadline"
        rules={[{ required: true }]}
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item 
        label="End Time"
        name="endTime"
        rules={[{ required: true }]}
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item
        label="Reviewers Per Paper"
        name="reviewNumberForEachPaper"
        rules={[{ required: true, message: 'Please input the number of reviews of each paper!' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={submitting}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Conferences;
