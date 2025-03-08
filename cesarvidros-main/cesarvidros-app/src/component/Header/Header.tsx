import React from "react";
import { Layout, Typography, Row, Col } from "antd";

const { Header } = Layout;
const { Title, Text } = Typography;

interface Props {
  title: string;
}

export const HeaderComponent: React.FC<Props> = ({ title }) => {
  return (
    <Header style={{ background: "#001529", padding: "0 20px"}}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3} style={{ color: "#fff", margin: 0 }}>
            César Vidros
          </Title>
        </Col>

        <Col>
          <Text style={{ color: "#fff", fontSize: "16px" }}>{title}</Text>
        </Col>
      </Row>
    </Header>
  );
};
