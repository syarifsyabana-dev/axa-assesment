import React, { useEffect } from "react";
import { Form, Input, Modal, message } from "antd";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const ModalPost = ({ isModalOpen, setIsModalOpen, setIsLoading, detail }) => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  const userId = Number(searchParams.get("userId")) || 1;

  useEffect(() => {
    if (detail) {
      form.setFieldsValue({
        title: detail.title,
        body: detail.body,
      })
    }
  }, [detail])
  

  const handleOk = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const payload = {
          ...values,
          userId,
        };
        setIsModalOpen(false);
        await axios
          .post(`${process.env.REACT_APP_BASE_URL}/posts`, payload, {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
          .then(() => message.success("Post added successfully"))
          .catch((error) => message.error(error.message));
        await form.resetFields();
      })
      .catch((info) => {
        message.error(info.message);
      })
      .finally(() => setIsLoading(false));
  };

  const handleEdit = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const payload = {
          id: detail.id,
          ...values,
          userId,
        };
        setIsModalOpen(false);
        await axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/posts/${detail.id}`,
            payload,
            {
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          )
          .then(() => message.success("Post updated successfully"))
          .catch((error) => message.error(error.message));
        await form.resetFields();
      })
      .catch((info) => {
        message.error(info.message);
      })
      .finally(() => setIsLoading(false));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title="Post Form"
        open={isModalOpen}
        onOk={detail ? handleEdit : handleOk}
        onCancel={handleCancel}
        width={800}
        centered
        okText="Save"
      >
        <Form name="postForm" layout="vertical" form={form}>
          <Form.Item
            name={"title"}
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
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
        </Form>
      </Modal>
    </>
  );
};
export default ModalPost;
