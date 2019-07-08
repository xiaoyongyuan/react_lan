import React, { Component } from "react";
import $ from "jquery";
import "../../style/jhy/less/defendTime.less";
import axios from "../../axios";
import { Button, Row, Col, message } from "antd";
class DefendTime extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const _this = this;
    this.dataRecover();
    var key = 0;
    for (let i = 0; i < 7; i++) {
      if (
        $($($(".tr")[i]).find(".td")[48]).mousemove(function(e) {
          key = 0;
          return false;
        })
      ) {
      }
    }
    $("#tab").mousemove(function(e) {
      if (1 == key && e.target.tagName == "TD") {
        $(e.target)
          .addClass("selected")
          .css("background", "#32e8fe");
      }
    });
    $("#tab").mousedown(function(e) {
      key = 1;
    });
    $("#tab").mouseup(function(e) {
      key = 0;
    });

    $("#submitData").click(function() {
      var backdata = [];
      for (let i = 0; i < 7; i++) {
        let weekdata = [];

        for (let j = 0; j < 48; j++) {
          if ($($($(".tr")[i]).find(".td")[j]).hasClass("selected")) {
            weekdata.push(j + 1);
          }
        }
        backdata.push(`${weekdata}`);
      }
      var timelist = {};
      backdata.map((v, i) => {
        timelist[i + 1] = v;
      });
      axios
        .ajax({
          method: "post",
          url: window.g.loginURL + "/api/workingTime/setWorkingTime",
          data: {
            timelist: timelist,
            code: _this.props.code ? _this.props.code : _this.props.addBackCode,
            cid: _this.props.code ? _this.props.code : _this.props.addBackCode
          }
        })
        .then(res => {
          if (res.success) {
            message.success("布防时间提交成功");
          }
        });
    });

    $("#deleteData").click(function() {
      axios
        .ajax({
          method: "delete",
          url: window.g.loginURL + "/api/api/zworkingtime",
          data: {
            ids: _this.props.code ? _this.props.code : _this.props.addBackCode
          }
        })
        .then(res => {
          if (res.success) {
            message.success("删除成功");
          }
        });

      for (var h = 0; h < $(".td").length; h++) {
        if ($($(".td")[h]).hasClass("selected")) {
          $($(".td")[h])
            .removeClass("selected")
            .css("background", "#fff");
        }
      }
    });

    $(".delete").each(function(k, v) {
      $($(".delete")[k]).click(function() {
        axios
          .ajax({
            method: "delete",
            url: window.g.loginURL + "/api/api/deleteOneWorkingTime",
            data: {
              code: _this.props.code
                ? _this.props.code
                : _this.props.addBackCode,
              cid: _this.props.code
                ? _this.props.code
                : _this.props.addBackCode,
              deleteNum: k + 1
            }
          })
          .then(res => {
            if (res.success) {
              message.success("删除成功");
            }
          });
        if (
          $($("tr")[k])
            .find(".td")
            .hasClass("selected")
        ) {
          $($("tr")[k])
            .find(".td")
            .removeClass("selected")
            .css("background", "#fff");
        }
      });
    });
  }
  renderTable = () => {
    var cols = 49;
    var rows = 7;
    var htmlstr =
      "<table  id='tab' style='border-collapse: separate; border-spacing: 0 30px;' width='600'>";
    for (var i = 1; i <= rows; i++) {
      htmlstr += "<tr class='tr'>";
      for (var j = 1; j <= cols; j++) {
        htmlstr += "<td class='td'></td>";
      }
      htmlstr += "</tr>";
    }
    htmlstr += "</table>";
    return htmlstr;
  };
  dataRecover = () => {
    var res = this.props.equipData.timelist;
    var v;
    for (v in res) {
      res[v].split(",").map(m => {
        $($($(".tr")[v - 1]).find(".td")[m - 1])
          .addClass("selected")
          .css("background", "#32e8fe");
      });
    }
  };
  render() {
    return (
      <div
        className="defendTime"
        style={{
          padding: "30px",
          width: "100%",
          height: "100%"
        }}
      >
        <Row>
          <Col span={11}>
            <div
              className="defend"
              id="defend"
              dangerouslySetInnerHTML={{
                __html: this.renderTable()
              }}
            />
          </Col>
          <Col span={1} className="deleteWrap">
            <Button className="delete">删除</Button>
            <Button className="delete">删除</Button>
            <Button className="delete">删除</Button>
            <Button className="delete">删除</Button>
            <Button className="delete">删除</Button>
            <Button className="delete">删除</Button>
            <Button className="delete">删除</Button>
          </Col>
        </Row>

        <Row>
          <Col span={12} style={{ textAlign: "center" }}>
            <Button id="deleteData" type="danger">
              删除全部
            </Button>
            <Button
              id="submitData"
              type="primary"
              style={{ marginLeft: "200px" }}
            >
              确定
            </Button>
          </Col>
        </Row>
        <div id="result" />
      </div>
    );
  }
}

export default DefendTime;
