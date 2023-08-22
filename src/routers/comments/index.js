import { Button, Col, Row, Space, Spin, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CommentOutlined, ReloadOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import PostList from "./list";
import CommentForm from "./form";

const Comments = () => {
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [detail, setDetail] = useState(null);
  const [commentDetail, setCommentDetail] = useState(null);
  const [formComment, setFormComment] = useState(false);

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
          {!formComment && (
            <Space>
              <Button
                type="primary"
                icon={<CommentOutlined />}
                onClick={() => setFormComment(true)}
              >
                Comment
              </Button>
              <Button icon={<ReloadOutlined />} onClick={loadData}>
                Reload
              </Button>
            </Space>
          )}
        </Col>
      </Row>
      <h3>Comments</h3>
      {!formComment && (
        <PostList
          setCommentDetail={setCommentDetail}
          setFormComment={setFormComment}
          data={comments}
          setIsLoading={setIsLoading}
        />
      )}
      {formComment && (
        <CommentForm
          commentDetail={commentDetail}
          setCommentDetail={setCommentDetail}
          setIsLoading={setIsLoading}
          setFormComment={setFormComment}
        />
      )}
    </Spin>
  );
};

export default Comments;
