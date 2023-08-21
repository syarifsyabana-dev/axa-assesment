import { Button, Col, Row, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import PostList from "./list";

const Albums = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState([]);

  const loadData = () => {
    setIsLoading(true);
    const params = searchParams.get("userId")
      ? `?userId=${searchParams.get("userId")}`
      : "";
    axios
      .get(`https://jsonplaceholder.typicode.com/albums${params}`)
      .then((res) => {
        setAlbums(res.data);
      })
      .catch((error) => message.error(error.message))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h3>Albums</h3>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button icon={<ReloadOutlined />} onClick={loadData}>
            Reload
          </Button>
        </Col>
      </Row>
      <PostList data={albums} loading={isLoading} />
    </div>
  );
};

export default Albums;
