import { Button, Col, Row, Space, Spin, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FileAddFilled, ReloadOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import PostList from "./list";
import ModalPost from "./modal";

const Posts = () => {
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState(null);

  console.log(detail);

  const loadData = () => {
    setIsLoading(true);
    const params = searchParams.get("userId")
      ? `?userId=${searchParams.get("userId")}`
      : "";
    axios
      .get(`https://jsonplaceholder.typicode.com/posts${params}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => message.error(error.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      setDetail(null);
    }
  }, [isModalOpen]);

  return (
    <Spin spinning={isLoading}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h3>Posts</h3>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Space>
            <Button
              type="primary"
              icon={<FileAddFilled />}
              onClick={() => setIsModalOpen(true)}
            >
              Add Post
            </Button>
            <Button icon={<ReloadOutlined />} onClick={loadData}>
              Reload
            </Button>
          </Space>
        </Col>
      </Row>
      <PostList
        data={posts}
        setIsModalOpen={setIsModalOpen}
        setDetail={setDetail}
        setIsLoading={setIsLoading}
      />
      <ModalPost
        detail={detail}
        setIsLoading={setIsLoading}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Spin>
  );
};

export default Posts;
