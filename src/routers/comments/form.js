import { Button, Form, Input, Space } from "antd";
import React from "react";

const CommentForm = ({ setFormComment }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setFormComment(false);
  };
  return (
    <Form name="postForm" layout="vertical" form={form}>
      <Form.Item
        name={"name"}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"email"}
        label="Email"
        rules={[
          {
            required: true,
            type: "email",
          },
        ]}
      >
        <Input rows={3} />
      </Form.Item>
      <Form.Item
        name={"body"}
        label="Body"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      <div style={{ textAlign: "right" }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button type="default" onClick={handleCancel}>
            Cancel
          </Button>
        </Space>
      </div>
    </Form>
  );
};

export default CommentForm;
