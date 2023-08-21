import { Button, Col, Row, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import AlbumList from "./list";

const Photos = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState([]);

  async function loadData() {
    await setIsLoading(true);
    const params = searchParams.get("albumId");
    if (params) {
      axios
        .get(`https://jsonplaceholder.typicode.com/photos?albumId=${params}`)
        .then((res) => {
          setPhotos(res.data);
        })
        .catch((error) => message.error(error.message))
        .finally(() => setIsLoading(false));
    } else {
      message.error("Please select one album");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h3>Photos</h3>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button icon={<ReloadOutlined />} onClick={() => loadData()}>
            Reload
          </Button>
        </Col>
      </Row>
      <AlbumList data={photos} loading={isLoading} />
    </div>
  );
};

export default Photos;
