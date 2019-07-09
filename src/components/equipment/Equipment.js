import { Card, Col, Icon, Row, Pagination } from "antd";
import React, { Component } from "react";
import "../../style/jhy/less/equiplist.less";
import "../../style/jhy/less/reset.less";
import axios from "../../axios";
class Equipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipList: [],
      totalCount: 0,
      page: 1,
      pagesize: 10
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
        data: { page: this.state.page, pageSize: this.state.pagesize }
      })
      .then(res => {
        if (res.success) {
          this.setState({
            equipList: res.data,
            totalCount: res.totalcount
          });
        }
      });
  };
  pageChange = (page, pagesize) => {
    this.setState({
      page: page,
      pagesize: pagesize
    });
  };
  pageSizeChange = (current, size) => {
    this.setState({
      pagesize: size
    });
  };

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
            <div className="addEquip">
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
                  style={{ marginBottom: "16px", height: "25vh" }}
                  key={inx}
                  className="equipWrap"
                >
                  <div className="equipEle">
                    <div
                      style={{
                        height: "82%",
                        background: val.basemap
                          ? `url(${
                              val.basemap
                            }) no-repeat center center / 100% 100% `
                          : "#efefef",
                        position: "relative",
                        border: "1px solid #efefef"
                      }}
                    >
                      <p className="elli tit">
                        <span className="titpoint" />
                        {val.location}
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
                            : "未布防"}
                        </span>
                      </li>
                      <li className="extra">
                        <span className="expic" />
                        <span
                          onClick={() => {
                            this.setEquip(val.code);
                          }}
                        >
                          设置
                        </span>
                      </li>
                    </ul>
                  </div>
                </Col>
              ))
            : null}
        </Row>
        <Pagination
          onChange={(page, pagesize) => {
            this.pageChange(page, pagesize);
          }}
          onShowSizeChange={(current, size) => {
            this.pageSizeChange(current, size);
          }}
          hideOnSinglePage={true}
          total={this.state.totalCount}
          showSizeChanger
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
