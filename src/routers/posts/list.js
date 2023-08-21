import React, { useEffect, useState } from "react";
import { Button, List } from "antd";
import { useNavigate } from "react-router-dom";
import { CommentOutlined } from "@ant-design/icons";

const PostList = ({ data, loading }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // current page returns to 1 when data is reloaded
    setCurrentPage(1);
  }, [data]);

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
              key="btn-posts"
              type="link"
              icon={<CommentOutlined />}
              onClick={() => navigate(`/comments?postId=${item.id}`)}
            >
              Comments
            </Button>,
          ]}
        >
          <List.Item.Meta title={item.title} description={item.body} />
        </List.Item>
      )}
    />
  );
};
export default PostList;
