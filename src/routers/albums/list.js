import React, { useEffect, useState } from "react";
import { Card, Col, Pagination, Row, Spin } from "antd";

const { Meta } = Card;

const AlbumList = ({ data = [], loading }) => {
  const perPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState(0);
  const [limits, setLimits] = useState(4);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    setNewData(data.slice(orders, limits));
    // current page returns to 1 when data is reloaded
    setCurrentPage(1);
  }, [data]);

  useEffect(() => {
    setNewData(data.slice(orders, limits));
  }, [orders]);

  const handleChange = (page) => {
    setCurrentPage(page);
    setOrders((page - 1) * perPage);
    setLimits(page * perPage);
  };

  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        {newData.map((x, y) => {
          return (
            <Col span={6} key={y}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src={`https://picsum.photos/id/${orders + y}/200/300`}
                  />
                }
              >
                <Meta title={x.title} />
              </Card>
            </Col>
          );
        })}
        <Col span={24} style={{ textAlign: "right" }}>
          <Pagination
            current={currentPage}
            onChange={handleChange}
            total={data.length}
            pageSizeOptions={[4, 8, 16]}
            pageSize={perPage}
          />
          ;
        </Col>
      </Row>
    </Spin>
  );
};
export default AlbumList;
