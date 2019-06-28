import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import { Row, Col, Card, Progress, Descriptions, List, Radio } from "antd";
import "../../style/jhy/less/overview.less";

class Overview extends Component {
  componentDidMount() {}
  render() {
    const funconfig = [
      <Radio>云端同步服务器是否运行</Radio>,
      <Radio>删除服务器是否运行</Radio>,
      <Radio>直播服务器是否运行</Radio>
    ];
    const cpupie = {
      tooltip: {
        show: true
      },
      series: [
        {
          type: "pie",
          radius: ["50%", "80%"],
          data: [{ value: 25, selected: true }, { value: 75 }]
        }
      ],
      color: ["#006cff", "#dcdbe0"]
    };
    const physpie = {
      series: [
        {
          type: "pie",
          radius: ["50%", "80%"],
          label: [],
          data: [{ value: 25 }, { value: 25 }, { value: 50 }]
        }
      ],
      color: ["#006cff", "#ff7200", "#32e8fe"]
    };
    const diskpie = {
      series: [
        {
          type: "pie",
          radius: ["50%", "80%"],
          label: [],
          data: [{ value: 25 }, { value: 15 }, { value: 60 }]
        }
      ],
      color: ["#006cff", "#ff7200", "#32e8fe"]
    };
    return (
      <div className="overview">
        <div className="topwrap">
          <Row gutter={48}>
            <Col span={8}>
              <Card title="CPU" bordered={false} className="cpu">
                <Row>
                  <Col span={16}>
                    <div className="pie">
                      <ReactEcharts
                        id="cpuech"
                        option={cpupie}
                        style={{ height: "180px" }}
                      />
                    </div>
                  </Col>
                  <Col span={8}>
                    <p className="desc">
                      <span className="dot bluedot" />
                      CUP使用率
                    </p>
                    <p className="desc">
                      <span className="dot graydot" />
                      CUP空闲率
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="物理内存" bordered={false} className="physics">
                <Row>
                  <Col span={16}>
                    <div className="pie">
                      <ReactEcharts
                        option={physpie}
                        style={{ height: "180px" }}
                      />
                    </div>
                  </Col>
                  <Col span={8}>
                    <p className="desc">
                      <span className="dot bluedot" />
                      总物理内存
                    </p>
                    <p className="desc">
                      <span className="dot orangedot" />
                      剩余物理内存
                    </p>
                    <p className="desc">
                      <span className="dot lightbluedot" />
                      已使用物理内存
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="磁盘内存" bordered={false} className="disk">
                <Row>
                  <Col span={16}>
                    <div className="pie">
                      <ReactEcharts
                        option={diskpie}
                        style={{ height: "180px" }}
                      />
                    </div>
                  </Col>
                  <Col span={8}>
                    <p className="desc">
                      <span className="dot bluedot" />
                      可使用内存
                    </p>
                    <p className="desc">
                      <span className="dot orangedot" />
                      剩余内存
                    </p>
                    <p className="desc">
                      <span className="dot lightbluedot" />
                      最大可使用内存
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
        <Row className="midwrap">
          <Card
            title="操作系统"
            bordered={false}
            // style={{ width: 300 }}
            className="ossys"
          >
            <Row>
              <Col span={5}>
                <span className="syslabel">总线程数</span>
                <Progress
                  percent={30}
                  className="prog"
                  format={percent => {
                    return percent;
                  }}
                />
              </Col>
              <Col span={5}>
                <span className="syslabel">CUP使用率</span>
                <Progress
                  percent={30}
                  className="prog"
                  format={percent => {
                    return percent;
                  }}
                />
              </Col>
              <Col span={5}>
                <span className="syslabel">显存</span>
                <Progress
                  percent={30}
                  className="prog"
                  format={percent => {
                    return percent;
                  }}
                />
              </Col>
              <Col span={5}>
                <span className="syslabel">空闲显存</span>
                <Progress
                  percent={30}
                  className="prog"
                  format={percent => {
                    return percent;
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Row>
        <Row className="botwrap">
          <Card title="功能设置" className="funset">
            <Row gutter={16}>
              <Col span={6}>
                <Descriptions bordered column={1}>
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
                <Descriptions bordered column={1}>
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
