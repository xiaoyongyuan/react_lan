import { Card, Col, Icon, Row, Pagination } from "antd";
import React, { Component } from "react";
import "../../style/jhy/less/equiplist.less";
import "../../style/jhy/less/reset.less";
import defpic from "../../style/jhy/imgs/def.png";
import onlinepic from "../../style/jhy/imgs/online.png";
import setpic from "../../style/jhy/imgs/set.png";
import addpic from "../../style/jhy/imgs/addpic.png";
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
            style={{ cursor: "pointer" }}
          >
            <img src={addpic} alt="" />
          </Col>
          {this.state.equipList.length > 0
            ? this.state.equipList.map((val, inx) => (
                <Col
                  md={6}
                  style={{ marginBottom: "16px" }}
                  key={inx}
                  className="equipWrap"
                >
                  <Icon type="delete" className="deleteEquip" />
                  <Card
                    cover={<img alt="example" src={val.pic_min} />}
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
                        <span
                          onClick={() => {
                            this.setEquip(val.code);
                          }}
                        >
                          设置
                        </span>
                      </div>
                    ]}
                  >
                    <p className="elli tit">
                      <span className="titpoint" />
                      {val.location}
                    </p>
                  </Card>
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
