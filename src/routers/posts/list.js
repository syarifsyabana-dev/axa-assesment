import React, { useEffect, useState } from "react";
import { Button, List, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import { CommentOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import axios from "axios";

const PostList = ({
  data,
  loading,
  setIsModalOpen,
  setDetail,
  setIsLoading,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // current page returns to 1 when data is reloaded
    setCurrentPage(1);
  }, [data]);

  const handleEdit = async (id) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setDetail(res.data);
        setIsModalOpen(true);
      });
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        message.success("Post deleted successfully");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <List
      pagination={{
        current: currentPage,
        onChange: (page) => setCurrentPage(page),
        pageSize: 5,
      }}
      loading={loading}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              key="btn-comment"
              type="link"
              icon={<CommentOutlined />}
              onClick={() => navigate(`/comments?postId=${item.id}`)}
            >
              Comments
            </Button>,
            <Button
              key="btn-update"
              type="link"
              icon={<EditFilled />}
              onClick={() => handleEdit(item.id)}
            >
              Edit
            </Button>,
            <Popconfirm
              title="Delete the post"
              description="Are you sure to delete this post?"
              onConfirm={() => handleDelete(item.id)}
              okText="Yes"
              cancelText="No"
              placement="topLeft"
            >
              <Button
                key="btn-delee"
                type="link"
                danger
                icon={<DeleteFilled />}
              >
                Delete
              </Button>
            </Popconfirm>,
          ]}
        >
          <List.Item.Meta title={item.title} description={item.body} />
        </List.Item>
      )}
    />
  );
};
export default PostList;
