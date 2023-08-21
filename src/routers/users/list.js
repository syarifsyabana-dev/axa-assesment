import React, { useEffect, useState } from "react";
import { Avatar, Button, List } from "antd";
import { ReadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const UserList = ({ data, loading }) => {
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
              onClick={() => navigate(`/posts?userId=${item.id}`)}
              icon={<ReadOutlined />}
            >
              posts
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar />}
            title={item.name}
            description={item.email}
          />
        </List.Item>
      )}
    />
  );
};
export default UserList;
