import { Tabs, Col, Row, List, Button, Select, Radio, Slider } from "antd";
import React, { Component } from "react";
import DefTime from "./DefendTime";
import "../../style/jhy/less/equipadd.less";
import "../../style/jhy/less/reset.less";

import backdrop from "../../style/jhy/imgs/backdrop.png";
import defarea from "../../style/jhy/imgs/defarea.png";
const { TabPane } = Tabs;
const { Option } = Select;

class EquipAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "tab1",
      noTitleKey: "app"
    };
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    const defopt = [
      <span
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img
          src={defarea}
          alt=""
          style={{ width: "auto", marginRight: "5px" }}
        />
        防区
      </span>,
      "一号防区",
      "二号防区",
      "三号防区"
    ];
    const definfo = [
      <p className="infowrap">
        <span className="label">摄像头名称:</span>空调机房顶部1号摄像头
      </p>,
      <p className="infowrap">
        <span className="label">摄像头IP:</span>173.11.11.11
      </p>,
      <p className="infowrap">
        <span className="label">摄像头端口:</span>123456
      </p>,
      <p className="infowrap">
        <span className="label">用户名:</span>13912345678
      </p>,
      <p className="infowrap">
        <span className="label">密码:</span>******
      </p>,
      <div className="infowrap">
        <span className="label">摄像头厂家:</span>
        <Select value={1}>
          <Option key="1" value={1}>
            海康
          </Option>
        </Select>
      </div>,
      <p className="infowrap">
        <span className="label">RTSP地址:</span>
        RTSP://XXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxx
      </p>
    ];
    return (
      <div className="equipadd">
        <Tabs defaultActiveKey="1" type="card">
          <TabPane
            tab={
              <span
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <span className="camera">摄像头设备</span>
              </span>
            }
            key="1"
          >
            <Row className="topwrap" gutter={16}>
              <Col span={12}>
                <img className="backdrop" src={backdrop} alt="" />
              </Col>
              <Col span={12}>
                <Row gutter={16}>
                  <Col span={6} style={{ position: "relative" }}>
                    <List
                      className="defopt"
                      bordered
                      dataSource={defopt}
                      renderItem={item => <List.Item>{item}</List.Item>}
                      style={{ textAlign: "center" }}
                    />
                    <Button className="again">重新获取底图</Button>
                  </Col>
                  <Col
                    span={18}
                    className="definfo"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                  >
                    <List
                      style={{ width: "90%" }}
                      dataSource={definfo}
                      renderItem={item => <List.Item>{item}</List.Item>}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="bottwrap" gutter={16}>
              <Col span={12}>
                <div className="defsetwrap">
                  <Row className="defsetit">防区设置</Row>
                  <Row>
                    <Col span={8} className="defset">
                      <Radio>检测类型选择</Radio>
                    </Col>
                    <Col span={8} className="defset">
                      <Radio>人员类型</Radio>
                    </Col>
                    <Col span={8} className="defset">
                      <Radio>车辆类型</Radio>
                    </Col>
                    <Col span={8} className="defset">
                      <Radio style={{ marginRight: "38px" }}>强制报警</Radio>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col span={12}>
                <div className="threshold">
                  <Row className="thresholdtit">设备智能分析阈值</Row>
                  <Row className="thresholesetWrap">
                    <span className="thresholdlabel">设置阈值（10-100）</span>
                    <Slider
                      step={10}
                      defaultValue={50}
                      min={10}
                      className="thresholdset"
                    />
                    <span className="thresholdrest">50</span>
                  </Row>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane
            tab={
              <span
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <span className="deftime">布防时间</span>
              </span>
            }
            key="2"
          >
            <DefTime />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default EquipAdd;
