import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Input, Select, Upload, Button, Space } from 'antd';
import { UploadOutlined, MinusCircleOutlined } from '@ant-design/icons';
import {
  closeNewSubmissionModal,
  newSubmissionModalSelector,
  getSubmissionInitInfoThunk,
  submitPaperThunk,
} from '../submissionsSlice';

const NewSubmissionModal = () => {
  const formRef = React.useRef();
  const dispatch = useDispatch();
  const {
    newSubmissionModalShow,
    loadingSubmitList,
    submitList,
    uploadUrl,
    submittingPaper,
  } = useSelector(newSubmissionModalSelector);

  const afterOpenChange = opened => {
    if (opened) {
      dispatch(getSubmissionInitInfoThunk());
    }
  };

  const fileChanged = e => {
    return e?.fileList;
  }

  const closeModal = () => {
    dispatch(closeNewSubmissionModal());
  };

  const onSubmit = () => {
    formRef.current.submit();
  };

  const onFinish = values => {
    const { authors, conId, title } = values;
    dispatch(submitPaperThunk({
      authors,
      conId,
      title,
    }));
  };

  return (
    <Modal
      onCancel={closeModal}
      maskClosable={false}
      open={newSubmissionModalShow}
      title="New Submission"
      onOk={onSubmit}
      afterOpenChange={afterOpenChange}
      okButtonProps={{ loading: submittingPaper }}
    >
      <Form ref={formRef} className="submissions_form" labelCol={{span: 6}} onFinish={onFinish}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Conference" name="conId" rules={[{ required: true, message: 'Please select a conference' }]}>
          <Select loading={loadingSubmitList}>
            {submitList.map(conf => (
              <Select.Option key={conf.conId}>
                {conf.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Paper"
          name="paper"
          valuePropName="fileList"
          rules={[{ required: true, message: 'Please upload your paper here' }]}
          getValueFromEvent={fileChanged}
        >
          <Upload
            action={uploadUrl}
            maxCount={1}
            name='paper'
            withCredentials
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.List name="authors" initialValue={['']}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name, key }, index) => (
                <Space key={key} align="start" className="submissions_author-container">
                  <Form.Item
                    labelCol={{span: 7}}
                    label={`Author email ${index + 1}`}
                    name={name}
                    rules={[{ required: true, message: 'Please enter author\'s email' }]}
                  >
                    <Input />
                  </Form.Item>
                  {fields.length > 1 ? (<MinusCircleOutlined className="submissions_del-btn" onClick={ () => remove(name) } />) : null}
                </Space>
              ))}
              <Form.Item>
                <Button style={{ width: '285px', marginLeft: '115px' }} onClick={() => { add() }}>Add author</Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default NewSubmissionModal;
