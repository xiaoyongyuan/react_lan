import { Col, Icon, Row, Pagination } from "antd";
import React, { Component } from "react";
import "../../style/jhy/less/equiplist.less";
import "../../style/jhy/less/reset.less";
import axios from "../../axios";
class Equipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipList: [],
      pageindex: 1,
      pagesize: 36,
      total: 0
    };
  }
  componentDidMount() {
    this.getList();
  }

  getList = () => {
    axios
      .ajax({
        method: "get",
        url: window.g.loginURL + "/api/camera/getlist",
        data: {
          // pagesize: this.state.pagesize,
          // pageindex: this.state.pageindex
        }
      })
      .then(res => {
        if (res.success) {
          this.setState({
            equipList: res.data
            // total: res.totalcount,
            // pageindex: res.page
          });
        }
      });
  };
  handlePageChange(current) {
    this.setState(
      {
        pageindex: current
      },
      () => {
        this.getList();
      }
    );
  }
  addEquip = () => {
    window.location.href = "#/main/equipset:add";
  };
  setEquip = code => {
    window.location.href = `#/main/equipset?code=${code}`;
  };
  render() {
    return (
      <div className="equip">
        <Row gutter={16}>
          <Col
            md={6}
            onClick={() => {
              this.addEquip();
            }}
            style={{
              marginBottom: "16px",
              cursor: "pointer",
              height: "25vh"
            }}
          >
            <div className="addEquip" style={{ background: "#fff" }}>
              <Icon
                type="plus"
                style={{ fontSize: "30px", color: "#2c459a" }}
              />
              <div style={{ color: "#2c459a", marginTop: "10px" }}>
                添加设备
              </div>
            </div>
          </Col>
          {this.state.equipList.length > 0
            ? this.state.equipList.map((val, inx) => (
                <Col
                  md={6}
                  style={{
                    marginBottom: "16px",
                    height: "25vh"
                  }}
                  key={inx}
                  className="equipWrap"
                >
                  <div className="equipEle" style={{ background: "#fff" }}>
                    <div
                      style={{
                        height: "82%",
                        background: val.basemap
                          ? "url(" +
                            `${val.basemap}`.split(".jpg")[0] +
                            `?t=${Date.parse(new Date())}.jpg` +
                            ")  no-repeat center center / 100% 100% "
                          : "#efefef",
                        position: "relative",
                        border: "1px solid #efefef"
                      }}
                    >
                      <p className="elli tit">
                        <span className="titpoint" />
                        {val.name}
                      </p>
                    </div>
                    <ul className="extraWrap">
                      <li className="extra">
                        <span className="expic" />
                        <span>在线</span>
                      </li>
                      <li className="extra">
                        <span className="expic" />
                        <span className="elli">
                          {val.workingstatus === 1
                            ? "布防中"
                            : val.workingstatus === 0
                            ? "休息中"
                            : val.workingstatus === -1
                            ? "未启用"
                            : val.workingstatus === -2
                            ? "未设置"
                            : null}
                        </span>
                      </li>
                      <li
                        className="extra elli"
                        onClick={() => {
                          this.setEquip(val.code);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="expic" />
                        <span>设置</span>
                      </li>
                    </ul>
                  </div>
                </Col>
              ))
            : null}
        </Row>
        <div className="paginationWrap">
          {/* <Pagination
            // total={73}
            total={this.state.total}
            current={this.state.pageindex}
            pageSize={this.state.pageSize || 10}
            // pageSize={36}
            showTotal={() => {
              return `共${this.state.total}条`;
            }}
            onChange={current => this.handlePageChange(current)}
            showQuickJumper
            // hideOnSinglePage={true}
            className="pagination"
          /> */}
        </div>
      </div>
    );
  }
}

export default Equipment;
