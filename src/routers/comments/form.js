import { Button, Form, Input, Space, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const CommentForm = ({
  commentDetail,
  setFormComment,
  setIsLoading,
  setCommentDetail,
}) => {
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const postId = Number(searchParams.get("postId")) || 1;

  useEffect(() => {
    if (commentDetail) {
      form.setFieldsValue({
        name: commentDetail.name,
        email: commentDetail.email,
        body: commentDetail.body,
      });
    }
  }, [form, commentDetail]);

  const handleCancel = () => {
    form.resetFields();
    setFormComment(false);
    setCommentDetail(null);
  };

  const handlePost = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const payload = {
          ...values,
          postId,
        };
        setFormComment(false);
        await axios
          .post("https://jsonplaceholder.typicode.com/comments", payload, {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
          .then(() => message.success("Comment added successfully"))
          .catch((error) => message.error(error.message));
        await form.resetFields();
      })
      .catch((info) => {
        message.error(info.message);
      })
      .finally(() => {
        setCommentDetail(null);
        setIsLoading(false);
      });
  };

  const handleUpdate = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const payload = {
          id: commentDetail.id,
          ...values,
          postId,
        };
        setFormComment(false);
        await axios
          .put(
            `https://jsonplaceholder.typicode.com/comments/${commentDetail.id}`,
            payload,
            {
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          )
          .then(() => message.success("Comment updated successfully"))
          .catch((error) => message.error(error.message));
        await form.resetFields();
      })
      .catch((info) => {
        message.error(info.message);
      })
      .finally(() => {
        setCommentDetail(null);
        setIsLoading(false);
      });
  };

  return (
    <Form
      name="postForm"
      onFinish={commentDetail ? handleUpdate : handlePost}
      layout="vertical"
      form={form}
    >
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
