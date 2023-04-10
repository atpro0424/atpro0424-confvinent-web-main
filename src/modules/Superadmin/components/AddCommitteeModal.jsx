import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  addCommitteeModalSelector,
  closeAddModal,
  addCommitteeThunk,
} from '../superadminSlice';
import { Modal, Form, Input } from 'antd';

const AddCommitteeModal = () => {
  const { addModalShow, addingCommittee } = useSelector(addCommitteeModalSelector);
  const dispatch = useDispatch();
  const form = React.useRef();
  
  const onCancel = () => {
    dispatch(closeAddModal());
  };

  const onOk = () => {
    form.current.submit();
  }

  const onFinish = values => {
    dispatch(addCommitteeThunk(values));
  }

  return (
    <Modal
      bodyStyle={{ paddingTop: '16px' }}
      open={addModalShow}
      onCancel={onCancel}
      okButtonProps={{ loading: addingCommittee }}
      onOk={onOk}
      okText="Submit"
      title="Add new committee"
      maskClosable={false}
    >
      <div>
        <Form ref={form} labelCol={{ span: 8 }} onFinish={onFinish}>
          <Form.Item label="Committee Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddCommitteeModal;
