import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import { Row, Col, Card, Progress, Descriptions, List } from "antd";

class Overview extends Component {
  const = (funconfig = [
    <Radio>云端同步服务器是否运行</Radio>,
    <Radio>删除服务器是否运行</Radio>,
    <Radio>直播服务器是否运行</Radio>
  ]);
  render() {
    return (
      <div className="overview">
        <Row className="topwrap" gutter={48}>
          <Col span={8}>
            <Card title="CPU" bordered={false} style={{ width: 300 }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
        </Row>
        <Row className="midwrap">
          <Card
            title="操作系统"
            bordered={false}
            // style={{ width: 300 }}
          >
            <Row>
              <Col span="4">
                <span className="syslabel">总线程数</span>
                <Progress percent={30} format={percent => {}} />
              </Col>
              <Col span="4">
                <span className="syslabel">CUP使用率</span>
                <Progress percent={30} />
              </Col>
              <Col span="4">
                <span className="syslabel">显存</span>
                <Progress percent={30} />
              </Col>
              <Col span="4">
                <span className="syslabel">空闲显存</span>
                <Progress percent={30} />
              </Col>
            </Row>
          </Card>
        </Row>
        <Row className="botwrap">
          <Card title="功能设置">
            <Row>
              <Col span={6}>
                <Descriptions title="User Info" bordered>
                  <Descriptions.Item label="系统持续运营时间">
                    365天12小时
                  </Descriptions.Item>
                  <Descriptions.Item label="一次算法处理警报数量">
                    123456条
                  </Descriptions.Item>
                  <Descriptions.Item label="二次算法处理警报数量">
                    23456条
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={6}>
                <Descriptions title="User Info" bordered>
                  <Descriptions.Item label="软件版本">V1.0.1</Descriptions.Item>
                  <Descriptions.Item label="一次算法版本">
                    V1.0.1
                  </Descriptions.Item>
                  <Descriptions.Item label="二次算法版本">
                    V1.0.1
                  </Descriptions.Item>
                  <Descriptions.Item label="SERVER版本">
                    V1.0.1
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={4}>
                <List
                  // style={{ width: "90%" }}
                  dataSource={funconfig}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
              </Col>
            </Row>
          </Card>
        </Row>
      </div>
    );
  }
}
export default Overview;
