import { Button, Col, Row, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserList from "./list";
import { ReloadOutlined } from "@ant-design/icons";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  async function loadData() {
    await setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users`)
      .then((res) => {
        setUsers(res.data);
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
          <h3>Users</h3>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button icon={<ReloadOutlined />} onClick={() => loadData()}>
            Reload
          </Button>
        </Col>
      </Row>
      <UserList data={users} loading={isLoading} />
    </div>
  );
};

export default Users;
