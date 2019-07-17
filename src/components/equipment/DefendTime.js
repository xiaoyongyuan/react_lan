import React, { Component } from "react";
import $ from "jquery";
import "../../style/jhy/less/defendTime.less";
import axios from "../../axios";
import {
  Button,
  Row,
  Col,
  message,
  Icon,
  Modal,
  Form,
  Checkbox,
  Radio
} from "antd";
const CheckboxGroup = Checkbox.Group;
const dayOptions = [
  { label: "星期一", value: 1 },
  { label: "星期二", value: 2 },
  { label: "星期三", value: 3 },
  { label: "星期四", value: 4 },
  { label: "星期五", value: 5 },
  { label: "星期六", value: 6 },
  { label: "星期日", value: 7 }
];
const FormModal = Form.create()(
  class extends React.Component {
    state = {
      checkedList: [],
      // indeterminate: true,
      checkAll: false,
      radioSelect: false
    };
    componentDidMount() {
      if (this.state.checkedList.length > 0) {
        this.setState({
          radioSelect: false
        });
      }
    }

    onChange = checkedList => {
      if (checkedList.length > 0) {
        this.setState({
          radioSelect: false
        });
      }
      this.setState({
        checkedList,
        // indeterminate:
        //   !!checkedList.length && checkedList.length < dayOptions.length,
        checkAll: checkedList.length === dayOptions.length
      });
    };
    onCheckAllChange = e => {
      const checkedList = [];
      dayOptions.map(val => {
        checkedList.push(val.value);
      });

      if (e.target.checked) {
        this.props.form.setFieldsValue({
          days: checkedList
        });
        this.setState({
          radioSelect: false
        });
      } else {
        this.props.form.setFieldsValue({
          days: []
        });
      }

      this.setState({
        checkedList: e.target.checked ? checkedList : [],
        // indeterminate: false,
        checkAll: e.target.checked
      });
    };

    render() {
      const { visible, onCancel, onOk, form, btnNum } = this.props;
      const { getFieldDecorator } = form;
      const day = {
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "日"
      };
      const selectLabel = (
        <span>
          复制星期{day[btnNum]}的布防时间到...
          <Checkbox
            // indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
            style={{ marginLeft: "20px" }}
          >
            全选
          </Checkbox>
        </span>
      );
      const title = (
        <span>
          <Icon
            type="question-circle"
            style={{ color: "#fbb937", marginRight: "20px" }}
          />
          确定进行以下操作吗?
        </span>
      );
      return (
        <Modal
          visible={visible}
          afterClose={this.afterClose}
          onOk={onOk}
          title={title}
          mask={false}
        >
          <Form layout="vertical">
            <Form.Item label={selectLabel} key="days">
              {getFieldDecorator("days", {
                initialValue: [btnNum]
              })(
                <CheckboxGroup options={dayOptions} onChange={this.onChange} />
              )}
            </Form.Item>
            <Form.Item label=" " key="delete">
              <Radio
                checked={this.state.radioSelect}
                onClick={() => {
                  this.setState(
                    {
                      radioSelect: !this.state.radioSelect
                    },
                    () => {
                      if (this.state.radioSelect) {
                        this.props.form.setFieldsValue({ days: [] });
                        this.setState({
                          // indeterminate: false,
                          checkAll: false
                        });
                      }
                    }
                  );
                }}
              >
                清除当前设定
              </Radio>
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);
class DefendTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      btnNum: "",
      currentData: [],
      subData: "",
      subBtn: false
    };
  }
  onShow() {
    this.setState({
      visible: true
    });
  }
  onCancel() {
    this.setState({
      visible: false
    });
  }
  onOk() {
    const { getFieldsValue } = this.form.props.form;
    this.setState({
      visible: false
    });

    if (this.form.state.radioSelect) {
      if (
        this.props.equipData.timelist &&
        this.props.equipData.timelist[this.state.btnNum]
      ) {
        axios
          .ajax({
            method: "delete",
            // url: "http://192.168.1.163:8111/api/api/deleteOneWorkingTime",
            url: window.g.loginURL + "/api/api/deleteOneWorkingTime",
            data: {
              cid: this.props.code ? this.props.code : this.props.addBackCode,
              deleteNum: this.state.btnNum
            }
          })
          .then(res => {
            if (res.success) {
              message.success("删除成功");
              this.props.getOne();
              if (
                $($("tr")[this.state.btnNum - 1])
                  .find(".td")
                  .hasClass("selected")
              ) {
                $($("tr")[this.state.btnNum - 1])
                  .find(".td")
                  .removeClass("selected")
                  .css("background", "#fff");
              }
            }
          });
      } else {
        if (
          $($("tr")[this.state.btnNum - 1])
            .find(".td")
            .hasClass("selected")
        ) {
          $($("tr")[this.state.btnNum - 1])
            .find(".td")
            .removeClass("selected")
            .css("background", "#fff");
        }
      }
    } else {
      if (getFieldsValue().days && this.state.currentData.length > 0) {
        getFieldsValue().days.map((g, h) => {
          if (
            this.props.equipData.timelist &&
            this.props.equipData.timelist[g] &&
            this.props.equipData.timelist[g].split(",").length > 0
          ) {
            if (
              $($("tr")[g - 1])
                .find(".td")
                .hasClass("selected") &&
              g != this.state.btnNum
            ) {
              $($("tr")[g - 1])
                .find(".td")
                .removeClass("selected")
                .css("background", "#fff");
            }
          }
          this.state.currentData.map((m, n) => {
            $($($(".tr")[g - 1]).find(".td")[m - 1])
              .addClass("selected")
              .css("background", "#32e8fe");

            return "";
          });
        });
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.equipData.timelist != nextProps.timelist) {
      this.dataRecover();
    }
  }
  componentDidMount() {
    const _this = this;
    this.dataRecover();
    var key = 0;
    for (let i = 0; i < 7; i++) {
      $($($(".tr")[i]).find(".td")[48]).mousemove(function(e) {
        key = 0;
        return false;
      });
    }
    $("#tab").mousemove(function(e) {
      if (1 === key && e.target.tagName === "TD") {
        $(e.target)
          .addClass("selected")
          .css("background", "#32e8fe");
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
        timelist["1"] = backdata[0];
        timelist["2"] = backdata[1];
        timelist["3"] = backdata[2];
        timelist["4"] = backdata[3];
        timelist["5"] = backdata[4];
        timelist["6"] = backdata[5];
        timelist["7"] = backdata[6];

        const trantime =
          "[" + JSON.stringify(timelist).replace(/\"/g, "'") + "]";
        _this.setState({
          subData: trantime
        });
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
      timelist["1"] = backdata[0];
      timelist["2"] = backdata[1];
      timelist["3"] = backdata[2];
      timelist["4"] = backdata[3];
      timelist["5"] = backdata[4];
      timelist["6"] = backdata[5];
      timelist["7"] = backdata[6];

      const trantime = "[" + JSON.stringify(timelist).replace(/\"/g, "'") + "]";
      if (_this.state.subData != _this.props.equipData.timelist) {
        axios
          .ajax({
            method: "post",
            // url: "http://192.168.1.163:8111/api/workingTime/setWorkingTime",
            url: window.g.loginURL + "/api/workingTime/setWorkingTime",
            data: {
              timelist: trantime,
              cid: _this.props.code ? _this.props.code : _this.props.addBackCode
            }
          })
          .then(res => {
            if (res.success) {
              _this.setState({
                subBtn: true,
                subData: trantime
              });
              message.success("布防时间提交成功");
              _this.props.getOne();
            }
          });
      }
    });

    $("#deleteData").click(function() {
      if (_this.props.equipData.timelist != null) {
        axios
          .ajax({
            method: "delete",
            url: window.g.loginURL + "/api/api/zworkingtime",
            // url: "http://192.168.1.163:8111/api/api/zworkingtime",
            data: {
              ids: _this.props.code ? _this.props.code : _this.props.addBackCode
            }
          })
          .then(res => {
            if (res.success) {
              message.success("成功删除全部");
              this.props.getOne();
              for (var h = 0; h < $(".td").length; h++) {
                if ($($(".td")[h]).hasClass("selected")) {
                  $($(".td")[h])
                    .removeClass("selected")
                    .css("background", "#fff");
                }
              }
            }
          });
      } else {
        for (var h = 0; h < $(".td").length; h++) {
          if ($($(".td")[h]).hasClass("selected")) {
            $($(".td")[h])
              .removeClass("selected")
              .css("background", "#fff");
          }
        }
      }
    });

    $(".delete").each(function(k, v) {
      $($(".delete")[k]).click(function() {
        const currentData = [];
        $($("tr")[k])
          .find(".td")
          .each((m, n) => {
            if ($(n).hasClass("selected")) {
              currentData.push(m + 1);
            }
          });

        _this.setState({
          visible: true,
          btnNum: k + 1,
          currentData: currentData
        });
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.subData != this.state.subData) {
      this.setState({
        subBtn: false
      });
    }
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
        return "";
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
          <Col xl={{ span: 16 }} xxl={{ span: 11 }}>
            <div
              className="defend"
              id="defend"
              dangerouslySetInnerHTML={{
                __html: this.renderTable()
              }}
            />
          </Col>
          <Col xl={{ span: 2 }} xxl={{ span: 1 }} className="deleteWrap">
            <Button className="delete">
              <Icon type="setting" />
            </Button>
            <Button className="delete">
              <Icon type="setting" />
            </Button>
            <Button className="delete">
              <Icon type="setting" />
            </Button>
            <Button className="delete">
              <Icon type="setting" />
            </Button>
            <Button className="delete">
              <Icon type="setting" />
            </Button>
            <Button className="delete">
              <Icon type="setting" />
            </Button>
            <Button className="delete">
              <Icon type="setting" />
            </Button>
          </Col>
        </Row>

        <Row>
          <Col span={12} style={{ textAlign: "center" }}>
            <Button id="deleteData" type="danger">
              清除全部
            </Button>
            <Button
              id="submitData"
              type="primary"
              style={{ marginLeft: "200px" }}
              disabled={this.state.subBtn}
            >
              保存并应用
            </Button>
          </Col>
        </Row>
        <FormModal
          visible={this.state.visible}
          onCancel={() => this.onCancel()}
          onOk={() => this.onOk()}
          btnNum={this.state.btnNum}
          wrappedComponentRef={form => (this.form = form)}
        />
      </div>
    );
  }
}

export default DefendTime;
