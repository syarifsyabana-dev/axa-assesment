import React from "react";
import { Card, Col, Image, Row, Skeleton, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const PhotoList = ({ data = [], loading }) => {
  const navigate = useNavigate();

  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        {data.map((x, y) => {
          return (
            <Col span={4} key={y}>
              {loading && <Skeleton.Image style={{width: '180px', height: '180px'}} active />}
              {!loading && (
                <Card
                  hoverable
                  cover={
                    <Image
                      alt={x.title}
                      preview={{
                        src: x.url,
                      }}
                      src={x.thumbnailUrl}
                    />
                  }
                >
                  <Meta title={x.title} />
                </Card>
              )}
            </Col>
          );
        })}
      </Row>
    </Spin>
  );
};
export default PhotoList;
