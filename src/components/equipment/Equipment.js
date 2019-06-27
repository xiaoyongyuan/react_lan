import { Card, Col, Icon, Row, Pagination } from "antd";
import React, { Component } from "react";
import "../../style/jhy/less/equiplist.less";
import "../../style/jhy/less/reset.less";
import defpic from "../../style/jhy/imgs/def.png";
import onlinepic from "../../style/jhy/imgs/online.png";
import setpic from "../../style/jhy/imgs/set.png";
const { Meta } = Card;

class Equipment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addEquip = () => {
    window.location.href = "#/main/equipadd";
  };
  render() {
    return (
      <div className="equip">
        <Row gutter={16}>
          <Col md={6} style={{ height: "270px" }}>
            <div
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                border: "1px solid #eeeeee"
              }}
              onClick={() => {
                this.addEquip();
              }}
            >
              <p>
                <Icon
                  type="plus"
                  style={{ fontSize: "30px", color: "#223c95" }}
                />
              </p>
              <p style={{ color: "#223c95" }}>添加设备</p>
            </div>
          </Col>
          <Col md={6} style={{ marginBottom: "16px" }}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <div className="extra">
                  <img src={onlinepic} alt="" />
                  <span>在线</span>
                </div>,
                <div className="extra">
                  <img src={defpic} alt="" />
                  <span>布防中</span>
                </div>,
                <div className="extra">
                  <img src={setpic} alt="" />
                  <span>设置</span>
                </div>
              ]}
            >
              <p className="elli tit">
                <span className="titpoint" />
                啊大大的大大的大大的大大的
              </p>
            </Card>
          </Col>
          <Col md={6} style={{ marginBottom: "16px" }}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <div className="extra">
                  <img src={onlinepic} alt="" />
                  <span>在线</span>
                </div>,
                <div className="extra">
                  <img src={defpic} alt="" />
                  <span>布防中</span>
                </div>,
                <div className="extra">
                  <img src={setpic} alt="" />
                  <span>设置</span>
                </div>
              ]}
            >
              <p className="elli tit">啊大大的大大的大大的大大的</p>
            </Card>
          </Col>
          <Col md={6} style={{ marginBottom: "16px" }}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <div className="extra">
                  <img src={onlinepic} alt="" />
                  <span>在线</span>
                </div>,
                <div className="extra">
                  <img src={defpic} alt="" />
                  <span>布防中</span>
                </div>,
                <div className="extra">
                  <img src={setpic} alt="" />
                  <span>设置</span>
                </div>
              ]}
            >
              <p className="elli tit">啊大大的大大的大大的大大的</p>
            </Card>
          </Col>
          <Col md={6} style={{ marginBottom: "16px" }}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <div className="extra">
                  <img src={onlinepic} alt="" />
                  <span>在线</span>
                </div>,
                <div className="extra">
                  <img src={defpic} alt="" />
                  <span>布防中</span>
                </div>,
                <div className="extra">
                  <img src={setpic} alt="" />
                  <span>设置</span>
                </div>
              ]}
            >
              <p className="elli tit">啊大大的大大的大大的大大的</p>
            </Card>
          </Col>
          <Col md={6} style={{ marginBottom: "16px" }}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <div className="extra">
                  <img src={onlinepic} alt="" />
                  <span>在线</span>
                </div>,
                <div className="extra">
                  <img src={defpic} alt="" />
                  <span>布防中</span>
                </div>,
                <div className="extra">
                  <img src={setpic} alt="" />
                  <span>设置</span>
                </div>
              ]}
            >
              <p className="elli tit">啊大大的大大的大大的大大的</p>
            </Card>
          </Col>
          <Col md={6} style={{ marginBottom: "16px" }}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <div className="extra">
                  <img src={onlinepic} alt="" />
                  <span>在线</span>
                </div>,
                <div className="extra">
                  <img src={defpic} alt="" />
                  <span>布防中</span>
                </div>,
                <div className="extra">
                  <img src={setpic} alt="" />
                  <span>设置</span>
                </div>
              ]}
            >
              <p className="elli tit">啊大大的大大的大大的大大的</p>
            </Card>
          </Col>
          <Col md={6} style={{ marginBottom: "16px" }}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <div className="extra">
                  <img src={onlinepic} alt="" />
                  <span>在线</span>
                </div>,
                <div className="extra">
                  <img src={defpic} alt="" />
                  <span>布防中</span>
                </div>,
                <div className="extra">
                  <img src={setpic} alt="" />
                  <span>设置</span>
                </div>
              ]}
            >
              <p className="elli tit">啊大大的大大的大大的大大的</p>
            </Card>
          </Col>
        </Row>
        <Pagination
          total={50}
          showSizeChanger
          showQuickJumper
          showTotal={total => {
            return `共${total}条`;
          }}
          className="pagination"
        />
      </div>
    );
  }
}

export default Equipment;
