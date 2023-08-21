import React, { useEffect, useState } from "react";
import { List } from "antd";

const CommentList = ({ data, loading }) => {
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
        <List.Item>
          <List.Item.Meta
            title={item.name}
            description={item.email}
          />
          {item.body}
        </List.Item>
      )}
    />
  );
};
export default CommentList;
