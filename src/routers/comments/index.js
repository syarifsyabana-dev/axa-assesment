import { Button, Col, Row, Spin, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import PostList from "./list";

const Comments = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [detail, setDetail] = useState(null);

  const loadData = async () => {
    setIsLoading(true);
    const params = searchParams.get("postId");
    if (params) {
      // Get posts detail
      axios
        .all([
          axios.get(`https://jsonplaceholder.typicode.com/posts/${params}`),
          axios.get(
            `https://jsonplaceholder.typicode.com/posts/${params}/comments`
          ),
        ])
        .then(
          axios.spread((res1, res2) => {
            // output of req.
            setDetail(res1.data);
            setComments(res2.data);
          })
        )
        .catch((error1, error2) => {
          message.error(error1.message);
          message.error(error1.message);
        })
        .finally(() => setIsLoading(false));
    } else {
      message.error("Please select one post");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h2>{detail?.title}</h2>
          <p>{detail?.body}</p>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button icon={<ReloadOutlined />} onClick={loadData}>
            Reload
          </Button>
        </Col>
      </Row>
      <h3>Comments</h3>
      <PostList data={comments} />
    </Spin>
  );
};

export default Comments;
