import React, { useEffect, useState } from "react";
import { Button, List, Popconfirm, message } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import axios from "axios";

const CommentList = ({
  data,
  loading,
  setCommentDetail,
  setFormComment,
  setIsLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // current page returns to 1 when data is reloaded
    setCurrentPage(1);
  }, [data]);

  const handleEdit = (data) => {
    setCommentDetail(data);
    setFormComment(true);
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    axios
      .delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then(() => {
        message.success("Comment deleted successfully");
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
              key="btn-update"
              type="link"
              icon={<EditFilled />}
              onClick={() => handleEdit(item)}
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
          <List.Item.Meta title={item.name} description={item.email} />
          {item.body}
        </List.Item>
      )}
    />
  );
};
export default CommentList;
