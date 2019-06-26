import React, { Component } from "react";
import { Row, Col, TimePicker, DatePicker, Button } from "antd";
import "../../style/jhy/less/defendTime.less";
import DefendTimeChild from "./DefendTimeChild";

class DefendTime extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div className="defendTimeWrap">
        <Row gutter={32}>
          <Col span={2}>
            <span
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {/* <img
                src={defarea}
                alt=""
                style={{ width: "auto", marginRight: "5px" }}
              /> */}
              时间
            </span>
          </Col>
          <Col span={2}>删除</Col>
          <Col span={2}>删除全部</Col>
          <Col span={4}>日历</Col>
        </Row>
        <div
          className="defendTime"
          style={{
            margin: "20px",
            padding: "20px",
            width: "100%",
            height: "100%"
          }}
        >
          <DefendTimeChild key="day1" id="day1" bar="1" />
          <DefendTimeChild key="day2" id="day2" bar="2" />
          <DefendTimeChild key="day3" id="day3" bar="3" />
          <DefendTimeChild key="day4" id="day4" bar="4" />
          <DefendTimeChild key="day5" id="day5" bar="5" />
          <DefendTimeChild key="day6" id="day6" bar="6" />
          <DefendTimeChild key="day7" id="day7" bar="7" />
          <p>
            <button
              onClick={() => {
                this.getResultData();
              }}
            >
              获取数据
            </button>
            <span style={{ marginLeft: "20px" }} id="resultdata" />
          </p>
        </div>
        <Row gutter={16}>
          <Col span={4}>
            <Button>删除设备</Button>
          </Col>
          <Col span={4}>
            <Button>保存</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DefendTime;
