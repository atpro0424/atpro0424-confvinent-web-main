import React from 'react';
import { Form, Input, Button, Switch , DatePicker, Select} from 'antd';

const Conferences = () => {
  const onFinish = (values) => {
    console.log('Form submitted with values: ', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validateEmail = (email) => {
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return re.test(email);
  };

  return (
      <Form
      name="basic"
      labelCol={{span: 8,}}
      wrapperCol={{span: 16,}}
      style={{maxWidth: 600,}}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      >
      <Form.Item
        label="Conference Name"
        rules={[{ required: true, message: 'Please input the conference number!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        label="Submit Deadline" 
        rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
      
        <Form.Item 
        label="Review Deadline" 
        rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
      
      <Form.Item
        label="Address"
        rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <Input />
      </Form.Item>

        <Form.Item label="Is Virtual" valuePropName="checked">
          <Switch />
        </Form.Item>

      <Form.Item
        label="Reviewers Per Paper"
        rules={[{ required: true, message: 'Please input the number of reviews of each paper!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email List"
        name="emailList"
        rules={[
          {
            validator(_, value) {
              if (value.every((email) => validateEmail(email))) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Please enter valid email addresses!'));
            },
          },
        ]}
        >
          <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Enter email addresses and press Enter"
          tokenSeparators={[';']}/>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      
      

    </Form>
  );
};

export default Conferences;
