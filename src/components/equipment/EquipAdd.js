import { Card, Tabs, Col, Icon, Row } from "antd";
import React, { Component } from "react";
import "../../style/jhy/less/equipadd.less";
import "../../style/jhy/less/reset.less";
import camera from "../../style/jhy/imgs/camera.png";
import deftime from "../../style/jhy/imgs/deftime.png";
import backdrop from "../../style/jhy/imgs/backdrop.png";
import defarea from "../../style/jhy/imgs/defarea.png";
const { TabPane } = Tabs;

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
    return (
      <div className="equipadd">
        <Tabs defaultActiveKey="1" type="card">
          <TabPane
            tab={
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img
                  src={camera}
                  alt=""
                  className="icon"
                  id="icon"
                  style={{ width: "auto", marginRight: "10px" }}
                />
                <span>摄像头设备</span>
              </span>
            }
            key="1"
          >
            <Row className="topwrap">
              <Col span={12}>
                <img className="backdrop" src={backdrop} alt="" />
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={6}>
                    <div className="defopt" />
                  </Col>
                  <Col span={18}>2</Col>
                </Row>
              </Col>
            </Row>
            <Row className="bottpwrap">
              <Col span={12}>3</Col>
              <Col span={12}>4</Col>
            </Row>
          </TabPane>
          <TabPane
            tab={
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img
                  src={deftime}
                  alt=""
                  style={{ width: "auto", marginRight: "10px" }}
                />
                <span>布防时间</span>
              </span>
            }
            key="2"
          >
            Tab 2
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default EquipAdd;
