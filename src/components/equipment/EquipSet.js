import {
  Tabs,
  Col,
  Row,
  List,
  Button,
  Select,
  Form,
  Input,
  Slider,
  Checkbox,
  Switch,
  message,
  Radio,
  Icon
} from "antd";
import React, { Component, Fragment } from "react";
import DefTime from "./DefendTime";
import axios from "../../axios/index";
import "../../style/jhy/less/equipset.less";
import "../../style/jhy/less/reset.less";

import backdrop from "../../style/jhy/imgs/backdrop.png";
const { TabPane } = Tabs;
const { Option } = Select;
const blue = "#5063ee";
const red = "#ED2F2F";
const green = "#4ec9b0";
const maskcol = "rgba(204, 204, 204, 0.1)";
var open = false;
var moveswitch = false;
var scopeswitch = false;

class EquipSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addOnly: true,
      addBackCode: "",
      equipData: {},
      unlock: true,
      disabledStopSer: true,
      disabled24: true,
      disabledRecover: true,
      oneTypeSelect: [0],
      twoTypeSelect: [0],
      threeTypeSelect: [0],
      defSelect: "zero",
      sliderChange: false,
      threshold: 5,
      frozentime: 5,
      src: "",
      cid: "",
      presentlast: [],
      initarea: [
        [195, 364],
        [197, 252],
        [307, 192],
        [412, 264],
        [412, 369],
        [303, 433]
      ],
      newinitarea: [],
      initareaMove: false,
      areaOne: [], //防区一
      areaTwo: [],
      areaThree: [],
      defOneAddBtn: true,
      defTwoAddBtn: true,
      defThreeAddBtn: true,
      defOneDelBtn: true,
      defTwoDelBtn: true,
      defThreeDelBtn: true,
      defOneSubBtn: true,
      defTwoSubBtn: true,
      defThreeSubBtn: true
    };
  }
  componentDidMount() {
    if (this.props.query.code) {
      this.getOne();
    }
  }
  getOne = () => {
    const { setFieldsValue } = this.props.form;
    axios
      .ajax({
        method: "get",
        url: window.g.loginURL + "/api/camera/getone",
        data: {
          code: this.props.query.code
        }
      })
      .then(res => {
        if (res.success) {
          console.log(res.data, "list");
          if (res.data.cstatus === 0) {
            if (res.data.field) {
              this.setState({
                unlock: false
              });
            }
            this.setState({
              disabledStopSer: true,
              disabled24: true,
              disabledRecover: true
            });
          } else if (res.data.cstatus === 1) {
            this.setState({
              unlock: true
            });
            if (res.data.if_cancel === 1) {
              this.setState({
                disabledStopSer: false,
                disabledRecover: false
              });
            } else if (res.data.if_cancel === 0) {
              this.setState({
                disabledStopSer: false,
                disabled24: false
              });
            } else if (res.data.if_cancel === 2) {
              this.setState({
                disabledRecover: false,
                disabled24: false
              });
            }
          }
          this.setState(
            {
              equipData: res.data
            },
            () => {
              const equipData = this.state.equipData;
              setFieldsValue({
                name: equipData.name || "",
                ipctype: equipData.ipctype || "hikvision",
                fielddistance: equipData.fielddistance || "10~20米",
                scene: equipData.scene || "室外",
                ip: equipData.ip || "",
                authport: equipData.authport || "",
                ausername: equipData.ausername || "",
                apassword: equipData.apassword || "",
                streamport: equipData.streamport || "",
                vusername: equipData.vusername || "",
                vpassword: equipData.vpassword || "",
                Protocol: equipData.Protocol || "",
                threshold: equipData.threshold || 5,
                frozentime: equipData.frozentime || 5,
                alarmtype: equipData.alarmtype || ""
              });
            }
          );
        }
      });
  };
  handleBack = () => {
    window.location.href = "#/main/equipment";
  };
  handleUnlock = () => {
    axios
      .ajax({
        method: "put",
        url: window.g.loginURL + "/api/camera/update",
        data: {
          code: this.state.addBackCode || this.props.query.code,
          cstatus: 1
        }
      })
      .then(res => {
        if (res.success) {
          message.success("已启用");
          this.getOne();
        }
      });
  };
  handleStop = () => {
    axios
      .ajax({
        method: "put",
        url: window.g.loginURL + "/api/camera/update",
        data: {
          code: this.state.addBackCode || this.props.query.code,
          if_cancel: 2
        }
      })
      .then(res => {
        if (res.success) {
          message.success("已停止服务");
          this.getOne();
        }
      });
  };
  handleTwentyFour = () => {
    axios
      .ajax({
        method: "put",
        url: window.g.loginURL + "/api/camera/update",
        data: {
          code: this.state.addBackCode || this.props.query.code,
          if_cancel: 1
        }
      })
      .then(res => {
        if (res.success) {
          message.success("24小时设防中");
          this.getOne();
        }
      });
  };
  handleRecover = () => {
    axios
      .ajax({
        method: "put",
        url: window.g.loginURL + "/api/camera/update",
        data: {
          code: this.state.addBackCode || this.props.query.code,
          if_cancel: 0
        }
      })
      .then(res => {
        if (res.success) {
          message.success("已恢复");
          this.getOne();
        }
      });
  };
  handleDeviceDel = () => {
    axios
      .ajax({
        method: "put",
        url: window.g.loginURL + "/api/camera/update",
        data: {
          code: this.state.addBackCode || this.props.query.code,
          ifdel: 1
        }
      })
      .then(res => {
        if (res.success) {
          message.success("已删除");
          window.location.href = "#/main/equipment";
        }
      });
  };
  handleTabChange(activekey) {
    if (activekey === "1") {
      //   this.setState({
      //      defOneAddBtn: true,
      // defTwoAddBtn: true,
      // defThreeAddBtn: true,
      // defOneDelBtn: true,
      // defTwoDelBtn: true,
      // defThreeDelBtn: true,
      // defOneSubBtn: true,
      // defTwoSubBtn: true,
      // defThreeSubBtn: true
      //   })
      const equipData = this.state.equipData;
      if (equipData.field && equipData.field[1]) {
        this.setState(
          {
            areaOne: equipData.field[1].pointList
          },
          () => {
            this.boundarydraw();
          }
        );
      }
      if (equipData.field && equipData.field[2]) {
        this.setState(
          {
            areaTwo: equipData.field[2].pointList
          },
          () => {
            this.boundarydraw();
          }
        );
      }
      if (equipData.field && equipData.field[3]) {
        this.setState(
          {
            areaThree: equipData.field[3].pointList
          },
          () => {
            this.boundarydraw();
          }
        );
      }
      if (equipData.field && equipData.field[1] && equipData.field[2]) {
        this.setState(
          {
            areaOne: equipData.field[1].pointList,
            areaTwo: equipData.field[2].pointList
          },
          () => {
            this.boundarydraw();
          }
        );
      }
      if (equipData.field && equipData.field[1] && equipData.field[3]) {
        this.setState(
          {
            areaOne: equipData.field[1].pointList,
            areaThree: equipData.field[3].pointList
          },
          () => {
            this.boundarydraw();
          }
        );
      }
      if (equipData.field && equipData.field[2] && equipData.field[3]) {
        this.setState(
          {
            areaTwo: equipData.field[2].pointList,
            areaThree: equipData.field[3].pointList
          },
          () => {
            this.boundarydraw();
          }
        );
      }
      if (
        equipData.field &&
        equipData.field[1] &&
        equipData.field[2] &&
        equipData.field[3]
      ) {
        this.setState(
          {
            areaOne: equipData.field[1].pointList,
            areaTwo: equipData.field[2].pointList,
            areaThree: equipData.field[3].pointList
          },
          () => {
            this.boundarydraw();
          }
        );
      }
    }
  }
  handleThresholdChange = val => {
    this.setState({ sliderChange: true, threshold: val });
  };
  handleFrozenChange = val => {
    this.setState({ sliderChange: true, frozentime: val });
  };
  handleAdd = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;

    validateFields((err, fields) => {
      {
        if (err) {
        } else {
          axios
            .ajax({
              method: "post",
              url: window.g.loginURL + "/api/camera/add",
              data: {
                name: fields.name,
                ip: fields.ip,
                authport: fields.authport,
                ausername: fields.ausername,
                apassword: fields.apassword,
                vender: fields.vender,
                streamport: fields.streamport,
                threshold: fields.threshold,
                frozentime: fields.frozentime,
                alarmtype: fields.alarmtype
              }
            })
            .then(res => {
              if (res.success) {
                this.setState({
                  addOnly: false,
                  addBackCode: res.data.code
                });
                message.success("添加成功");
              }
            });
        }
      }
    });
  };
  handleChangeInfo = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;

    validateFields((err, fields) => {
      {
        if (err) {
        } else {
          axios
            .ajax({
              method: "put",
              url: window.g.loginURL + "/api/camera/update",
              data: {
                code: this.state.addBackCode || this.props.query.code,
                name: fields.name,
                ip: fields.ip,
                authport: fields.authport,
                ausername: fields.ausername,
                apassword: fields.apassword,
                vender: fields.vender,
                streamport: fields.streamport,
                threshold: fields.threshold,
                frozentime: fields.frozentime,
                alarmtype: fields.alarmtype
              }
            })
            .then(res => {
              message.success("信息更新成功");
            });
        }
      }
    });
  };
  boundarydraw = type => {
    let ele = document.getElementById("cavcontainer");
    let area = ele.getContext("2d");
    area.clearRect(0, 0, 704, 576);
    if (type === "one") {
      if (this.state.areaOne.length > 0) {
        let areaOne = this.state.areaOne;
        area.strokeStyle = blue;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaOne[0][0], areaOne[0][1]);
        areaOne.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaOne[i][0], areaOne[i][1]);
            if (i === 5) {
              area.lineTo(areaOne[0][0], areaOne[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaOne.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
      }
    } else if (type === "two") {
      if (this.state.areaTwo.length > 0) {
        let areaTwo = this.state.areaTwo;
        area.strokeStyle = red;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaTwo[0][0], areaTwo[0][1]);
        areaTwo.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaTwo[i][0], areaTwo[i][1]);
            if (i === 5) {
              area.lineTo(areaTwo[0][0], areaTwo[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaTwo.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
      }
    } else if (type === "three") {
      if (this.state.areaThree.length > 0) {
        let areaThree = this.state.areaThree;
        area.strokeStyle = green;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaThree[0][0], areaThree[0][1]);
        areaThree.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaThree[i][0], areaThree[i][1]);
            if (i === 5) {
              area.lineTo(areaThree[0][0], areaThree[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaThree.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
      }
    } else {
      if (this.state.areaOne.length > 0) {
        let areaOne = this.state.areaOne;
        area.strokeStyle = blue;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaOne[0][0], areaOne[0][1]);
        areaOne.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaOne[i][0], areaOne[i][1]);
            if (i === 5) {
              area.lineTo(areaOne[0][0], areaOne[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaOne.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
      }
      if (this.state.areaTwo.length > 0) {
        let areaTwo = this.state.areaTwo;
        area.strokeStyle = red;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaTwo[0][0], areaTwo[0][1]);
        areaTwo.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaTwo[i][0], areaTwo[i][1]);
            if (i === 5) {
              area.lineTo(areaTwo[0][0], areaTwo[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaTwo.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
      }
      if (this.state.areaThree.length > 0) {
        let areaThree = this.state.areaThree;
        area.strokeStyle = green;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaThree[0][0], areaThree[0][1]);
        areaThree.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaThree[i][0], areaThree[i][1]);
            if (i === 5) {
              area.lineTo(areaThree[0][0], areaThree[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaThree.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
      }
      if (this.state.areaOne.length > 0 && this.state.areaTwo.length > 0) {
        let areaOne = this.state.areaOne;
        area.strokeStyle = blue;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaOne[0][0], areaOne[0][1]);
        areaOne.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaOne[i][0], areaOne[i][1]);
            if (i === 5) {
              area.lineTo(areaOne[0][0], areaOne[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaOne.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
        let areaTwo = this.state.areaTwo;
        area.strokeStyle = red;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaTwo[0][0], areaTwo[0][1]);
        areaTwo.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaTwo[i][0], areaTwo[i][1]);
            if (i === 5) {
              area.lineTo(areaTwo[0][0], areaTwo[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaTwo.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
      }
      if (this.state.areaOne.length > 0 && this.state.areaThree.length > 0) {
        let areaOne = this.state.areaOne;
        area.strokeStyle = blue;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaOne[0][0], areaOne[0][1]);
        areaOne.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaOne[i][0], areaOne[i][1]);
            if (i === 5) {
              area.lineTo(areaOne[0][0], areaOne[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaOne.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
        let areaThree = this.state.areaThree;
        area.strokeStyle = green;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaThree[0][0], areaThree[0][1]);
        areaThree.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaThree[i][0], areaThree[i][1]);
            if (i === 5) {
              area.lineTo(areaThree[0][0], areaThree[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaThree.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
      }
      if (this.state.areaTwo.length > 0 && this.state.areaThree.length > 0) {
        let areaTwo = this.state.areaTwo;
        area.strokeStyle = red;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaTwo[0][0], areaTwo[0][1]);
        areaTwo.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaTwo[i][0], areaTwo[i][1]);
            if (i === 5) {
              area.lineTo(areaTwo[0][0], areaTwo[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaTwo.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
        let areaThree = this.state.areaThree;
        area.strokeStyle = green;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaThree[0][0], areaThree[0][1]);
        areaThree.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaThree[i][0], areaThree[i][1]);
            if (i === 5) {
              area.lineTo(areaThree[0][0], areaThree[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaThree.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
      }
      if (
        this.state.areaOne.length > 0 &&
        this.state.areaTwo.length > 0 &&
        this.state.areaThree.length > 0
      ) {
        let areaOne = this.state.areaOne;
        area.strokeStyle = blue;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaOne[0][0], areaOne[0][1]);
        areaOne.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaOne[i][0], areaOne[i][1]);
            if (i === 5) {
              area.lineTo(areaOne[0][0], areaOne[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaOne.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
        let areaTwo = this.state.areaTwo;
        area.strokeStyle = red;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaTwo[0][0], areaTwo[0][1]);
        areaTwo.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaTwo[i][0], areaTwo[i][1]);
            if (i === 5) {
              area.lineTo(areaTwo[0][0], areaTwo[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaTwo.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
        let areaThree = this.state.areaThree;
        area.strokeStyle = green;
        area.fillStyle = maskcol;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areaThree[0][0], areaThree[0][1]);
        areaThree.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areaThree[i][0], areaThree[i][1]);
            if (i === 5) {
              area.lineTo(areaThree[0][0], areaThree[0][1]);
            }
          }
          return "";
        });
        area.stroke();
        area.fill();
        areaThree.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
          return "";
        });
      }
    }
  };

  handleDefSelect = num => {
    switch (num) {
      case 0:
        {
          this.setState({
            defSelect: "zero",
            defOneAddBtn: true,
            defTwoAddBtn: true,
            defThreeAddBtn: true,
            defOneDelBtn: true,
            defTwoDelBtn: true,
            defThreeDelBtn: true,
            defOneSubBtn: true,
            defTwoSubBtn: true,
            defThreeSubBtn: true
          });
          this.boundarydraw();
        }

        break;
      case 1:
        {
          this.setState({
            defSelect: "one",
            defTwoAddBtn: true,
            defThreeAddBtn: true,
            defTwoDelBtn: true,
            defThreeDelBtn: true,
            defTwoSubBtn: true,
            defThreeSubBtn: true
          });
          if (this.state.equipData.field && this.state.equipData.field[1]) {
            this.setState({
              defOneDelBtn: false
            });
          } else {
            this.setState({
              defOneAddBtn: false,
              defOneSubBtn: false
            });
          }
          this.boundarydraw("one");
        }

        break;
      case 2:
        {
          this.setState({
            defSelect: "two",
            defOneAddBtn: true,
            defThreeAddBtn: true,
            defOneDelBtn: true,
            defThreeDelBtn: true,
            defOneSubBtn: true,
            defThreeSubBtn: true
          });
          if (this.state.equipData.field && this.state.equipData.field[2]) {
            this.setState({
              defTwoDelBtn: false
            });
          } else {
            this.setState({
              defTwoAddBtn: false,
              defTwoSubBtn: false
            });
          }
          this.boundarydraw("two");
        }

        break;
      case 3:
        {
          this.setState({
            defSelect: "three",
            defOneAddBtn: true,
            defTwoAddBtn: true,
            defOneDelBtn: true,
            defTwoDelBtn: true,
            defOneSubBtn: true,
            defTwoSubBtn: true
          });
          if (this.state.equipData.field && this.state.equipData.field[3]) {
            this.setState({
              defThreeDelBtn: false
            });
          } else {
            this.setState({
              defThreeAddBtn: false,
              defThreeSubBtn: false
            });
          }
          this.boundarydraw("three");
        }

        break;

      default:
        break;
    }
  };
  handleTypeChange = (cv, num) => {
    if (num === 1) {
      this.setState({
        oneTypeSelect: cv
      });
    } else if (num === 2) {
      this.setState({
        twoTypeSelect: cv
      });
    } else if (num === 3) {
      this.setState({
        threeTypeSelect: cv
      });
    }
  };
  handleDefAdd = (e = e || window.event) => {
    e.stopPropagation();
    e.cancelBubble = true;
    this.opendraw();
  };
  handleDefDelete = num => {
    switch (num) {
      case 1:
        if (this.state.equipData.field && this.state.equipData.field[1]) {
          {
            axios
              .ajax({
                method: "get",
                url: window.g.loginURL + "/api/camera/fielddel",
                data: {
                  code: this.state.addBackCode || this.state.equipData.code,
                  keys: 1
                }
              })
              .then(res => {
                if (res.success) {
                  message.success("1号防区删除成功");
                  this.setState(
                    {
                      defOneAddBtn: false,
                      defOneDelBtn: true,
                      defOneSubBtn: false,
                      areaOne: []
                    },
                    () => {
                      this.clearCanvas();
                    }
                  );
                }
              });
          }
        } else {
          this.clearCanvas();
        }

        break;
      case 2:
        if (this.state.equipData.field && this.state.equipData.field[2]) {
          {
            axios
              .ajax({
                method: "get",
                url: window.g.loginURL + "/api/camera/fielddel",
                data: {
                  code: this.state.addBackCode || this.state.equipData.code,
                  keys: 2
                }
              })
              .then(res => {
                if (res.success) {
                  message.success("2号防区删除成功");
                  this.setState(
                    {
                      defTwoAddBtn: false,
                      defTwoDelBtn: true,
                      defTwoSubBtn: false,
                      areaTwo: []
                    },
                    () => {
                      this.clearCanvas();
                    }
                  );
                }
              });
          }
        } else {
          this.clearCanvas();
        }

        break;
      case 3:
        if (this.state.equipData.field && this.state.equipData.field[3]) {
          {
            axios
              .ajax({
                method: "get",
                url: window.g.loginURL + "/api/camera/fielddel",
                data: {
                  code: this.state.addBackCode || this.state.equipData.code,
                  keys: 3
                }
              })
              .then(res => {
                if (res.success) {
                  message.success("3号防区删除成功");
                  this.setState(
                    {
                      defThreeAddBtn: false,
                      defThreeDelBtn: true,
                      defThreeSubBtn: false,
                      areaThree: []
                    },
                    () => {
                      this.clearCanvas();
                    }
                  );
                }
              });
          }
        } else {
          this.clearCanvas();
        }

        break;

      default:
        break;
    }
  };
  handleDefSubmit = num => {
    switch (num) {
      case 1:
        {
          axios
            .ajax({
              method: "get",
              url: window.g.loginURL + "/api/camera/fieldadd",
              data: {
                code: this.state.addBackCode || this.state.equipData.code,
                keys: 1,
                field: this.state.initareaMove
                  ? JSON.stringify(this.state.newinitarea)
                  : JSON.stringify(this.state.initarea),
                type: JSON.stringify(this.state.oneTypeSelect)
              }
            })
            .then(res => {
              if (res.success) {
                message.success("1号防区添加成功");
                this.setState(
                  {
                    defOneAddBtn: true,
                    defOneDelBtn: false,
                    defOneSubBtn: true
                    // areaOne: this.state.initarea || this.state.newinitarea
                  },
                  () => {
                    this.state.initareaMove
                      ? (this.state.areaOne = this.state.newinitarea)
                      : (this.state.areaOne = this.state.initarea);

                    this.boundarydraw("one");
                    this.state.newinitarea = [];
                  }
                );
              }
            });
        }

        break;
      case 2:
        {
          axios
            .ajax({
              method: "get",
              url: window.g.loginURL + "/api/camera/fieldadd",
              data: {
                code: this.state.addBackCode || this.state.equipData.code,
                keys: 2,
                field: this.state.initareaMove
                  ? JSON.stringify(this.state.newinitarea)
                  : JSON.stringify(this.state.initarea),
                type: JSON.stringify(this.state.twoTypeSelect)
              }
            })
            .then(res => {
              if (res.success) {
                message.success("2号防区添加成功");
                this.setState(
                  {
                    defTwoAddBtn: true,
                    defTwoDelBtn: false,
                    defTwoSubBtn: true
                  },
                  () => {
                    this.state.initareaMove
                      ? (this.state.areaTwo = this.state.newinitarea)
                      : (this.state.areaTwo = this.state.initarea);
                    this.boundarydraw("two");
                    this.state.newinitarea = [];
                  }
                );
              }
            });
        }

        break;
      case 3:
        {
          axios
            .ajax({
              method: "get",
              url: window.g.loginURL + "/api/camera/fieldadd",
              data: {
                code: this.state.addBackCode || this.state.equipData.code,
                keys: 3,
                field: this.state.initareaMove
                  ? JSON.stringify(this.state.newinitarea)
                  : JSON.stringify(this.state.initarea),
                type: JSON.stringify(this.state.threeTypeSelect)
              }
            })
            .then(res => {
              if (res.success) {
                message.success("3号防区添加成功");
                this.setState(
                  {
                    defThreeAddBtn: true,
                    defThreeDelBtn: false,
                    defThreeSubBtn: true,
                    areaThree: this.state.initareaMove
                      ? this.state.newinitarea
                      : this.state.initarea
                  },
                  () => {
                    this.state.initareaMove
                      ? (this.state.areaThree = this.state.newinitarea)
                      : (this.state.areaThree = this.state.initarea);

                    this.boundarydraw("three");
                    this.state.newinitarea = [];
                  }
                );
              }
            });
        }

        break;

      default:
        break;
    }
  };
  getBaseMapAnew = () => {
    axios
      .ajax({
        method: "get",
        url: window.g.loginURL + "/api/camera/getbasemap",
        data: {
          code: this.state.addBackCode || this.state.equipData.code
        }
      })
      .then(res => {
        if (res.success) {
          message.info(res.msg);
        }
      });
  };
  opendraw = () => {
    //开始绘制，打开开关
    open = true;
    this.draw(this.state.initarea);
  };
  clearCanvas = () => {
    let ele = document.getElementById("cavcontainer");
    let area = ele.getContext("2d");
    area.clearRect(0, 0, 704, 576);
  };

  draw = newdata => {
    //绘制默认的六边形
    //绘制区域
    let item = newdata;
    let ele = document.getElementById("cavcontainer");
    let area = ele.getContext("2d");
    area.clearRect(0, 0, 704, 576);
    area.strokeStyle = "#ff0";
    area.fillStyle = maskcol;
    area.lineWidth = 2;
    area.beginPath();
    area.moveTo(item[0][0], item[0][1]);
    item.map((elx, i) => {
      if (i > 0) {
        area.lineTo(item[i][0], item[i][1]);
        if (i === 5) {
          area.lineTo(item[0][0], item[0][1]);
        }
      }
    });
    area.stroke();
    area.fill();
    item.map(val => {
      area.beginPath();
      area.fillStyle = "rgba(128, 100, 162, 0.7)";
      area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
      area.fill();
    });
  };
  PointInPoly(pt) {
    //判断点是否在移动区域(b多边形向内缩小10像素)
    const initarea = this.state.initarea;
    for (
      var c = false, i = -1, l = initarea.length, j = l - 1;
      ++i < l;
      j = i
    ) {
      if (
        ((initarea[i][1] <= pt.y && pt.y < initarea[j][1]) ||
          (initarea[j][1] <= pt.y && pt.y < initarea[i][1])) &&
        pt.x <
          ((initarea[j][0] - initarea[i][0]) * (pt.y - initarea[i][1])) /
            (initarea[j][1] - initarea[i][1]) +
            initarea[i][0]
      ) {
        c = !c;
      }
    }
    return c;
  }
  dotrim = dot => {
    //判断鼠标是否在坐标点临界范围内
    const initarea = this.state.initarea;
    for (var i = 0; i < initarea.length; i++) {
      const el = initarea[i];
      if (
        el[0] - 10 <= dot.x &&
        dot.x <= el[0] + 10 &&
        el[1] - 10 <= dot.y &&
        dot.y <= el[1] + 10
      ) {
        return i + 1;
      }
    }
  };
  getcoord = coords => {
    //获取坐标
    let ele = document.getElementById("cavcontainer");
    let canvsclent = ele.getBoundingClientRect();
    let x = coords.clientX - canvsclent.left * (ele.width / canvsclent.width);
    let y = coords.clientY - canvsclent.top * (ele.height / canvsclent.height);
    let pre = { x, y };
    return pre;
  };
  getarr = () => {
    //得出可移动的最小最大范围
    let arrX = [];
    let arrY = [];
    let item = this.state.initarea;
    item.map((item, i) => {
      arrX.push(item[0]);
      arrY.push(item[1]);
    });
    return {
      minX: Math.min(...arrX),
      maxX: 704 - Math.max(...arrX),
      minY: Math.min(...arrY),
      maxY: 576 - Math.max(...arrY)
    };
  };

  mousedown = e => {
    //鼠标按下，判断是需要单点还是整体拖动
    e.preventDefault();
    if (!open) return;
    let getcord = this.getcoord(e);
    const ex = this.dotrim(getcord); //是否为单点范围内
    const scope = this.PointInPoly(getcord); //是否在图形内
    if (ex) {
      moveswitch = true;
      this.setState({ movedot: ex });
    } else if (scope && !ex) {
      //在图形内但不在单点范围内
      scopeswitch = true;
      this.setState({ movescope: this.getarr(), movepoint: getcord }); //可移动范围和初始点
    }
  };
  mouseup = () => {
    moveswitch = false;
    scopeswitch = false;
  };
  mousemove = e => {
    e.preventDefault();
    if (!open) {
      return;
    }
    const initarea = this.state.initarea;
    const movedot = this.state.movedot;
    const getcoord = this.getcoord(e);
    if (moveswitch) {
      //鼠标单点移动
      if (getcoord.x > 704) getcoord.x = 704;
      if (getcoord.y > 576) getcoord.y = 576;
      // initarea[movedot - 1] = [getcoord.x, getcoord.y];
      // this.setState({ initarea }, () => this.draw());
      var newinitarea = initarea;
      newinitarea[movedot - 1] = [getcoord.x, getcoord.y];
      this.setState({ newinitarea: newinitarea }, () => {
        this.draw(newinitarea);
        this.state.initareaMove = true;
      });
    } else if (scopeswitch) {
      //整体拖动
      const movepoint = this.state.movepoint;
      const movescope = this.state.movescope;
      var x = getcoord.x - movepoint.x;
      var y = getcoord.y - movepoint.y;
      if (x > 0 && Math.abs(x) > movescope.maxX) {
        x = movescope.maxX;
      }
      if (x < 0 && Math.abs(x) > movescope.minX) {
        x = -movescope.minX;
      }
      if (y > 0 && Math.abs(y) > movescope.maxY) {
        y = movescope.maxY;
      }
      if (y < 0 && Math.abs(y) > movescope.minY) {
        y = -movescope.minY;
      }
      var newinitarea = [];
      initarea.map(el => {
        newinitarea.push([el[0] + x, el[1] + y]);
      });
      this.setState({ newinitarea: newinitarea }, () => {
        this.draw(newinitarea);
        this.state.initareaMove = true;
      });
    }
  };

  render() {
    const checkType = [
      { label: "人员类型", value: 0 },
      { label: "车辆类型", value: 1 }
    ];
    const defopt = [
      <div
        ref={defzero => {
          this.defzero = defzero;
        }}
        onClick={() => {
          this.handleDefSelect(0);
        }}
        className="listItemWrap"
      >
        <Radio value="zero" checked={this.state.defSelect === "zero"}>
          总览
        </Radio>
        <span style={{ marginLeft: "30px" }}>
          提示:未添加防区为黄色
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              background: "#ff0",
              borderRadius: "5px",
              marginLeft: "5px"
            }}
          />
        </span>
      </div>,
      <div className="listItemWrap">
        <div
          className="optlabel"
          ref={defone => {
            this.defone = defone;
          }}
          onClick={() => {
            this.handleDefSelect(1);
          }}
        >
          <Radio
            value="one"
            checked={this.state.defSelect === "one"}
            style={{ color: `${blue}` }}
          >
            一号防区
          </Radio>
        </div>
        <div className="optlabel" style={{ width: "100%" }}>
          <span>检测类型</span>
          <span style={{ marginLeft: "40px" }}>
            <Checkbox.Group
              options={checkType}
              defaultValue={this.state.oneTypeSelect}
              onChange={cv => this.handleTypeChange(cv, 1)}
            />
          </span>
        </div>

        <div className="optbtn">
          <Button
            onClick={() => {
              this.handleDefAdd();
            }}
            disabled={this.state.defOneAddBtn}
          >
            添加
          </Button>
          <Button
            onClick={() => {
              this.handleDefDelete(1);
            }}
            type="danger"
            disabled={this.state.defOneDelBtn}
          >
            删除
          </Button>
          <Button
            onClick={() => {
              this.handleDefSubmit(1);
            }}
            type="primary"
            disabled={this.state.defOneSubBtn}
          >
            提交
          </Button>
        </div>
      </div>,
      <div className="listItemWrap">
        <div
          className="optlabel"
          ref={deftwo => {
            this.deftwo = deftwo;
          }}
          onClick={() => {
            this.handleDefSelect(2);
          }}
        >
          <Radio
            value="two"
            checked={this.state.defSelect === "two"}
            style={{ color: `${red}` }}
          >
            二号防区
          </Radio>
        </div>
        <div className="optlabel" style={{ width: "100%" }}>
          <span>检测类型</span>
          <span style={{ marginLeft: "40px" }}>
            <Checkbox.Group
              options={checkType}
              defaultValue={[0]}
              onChange={cv => this.handleTypeChange(cv, 2)}
            />
          </span>
        </div>

        <div className="optbtn">
          <Button
            onClick={() => {
              this.handleDefAdd();
            }}
            disabled={this.state.defTwoAddBtn}
          >
            添加
          </Button>
          <Button
            onClick={() => {
              this.handleDefDelete(2);
            }}
            type="danger"
            disabled={this.state.defTwoDelBtn}
          >
            删除
          </Button>
          <Button
            onClick={() => {
              this.handleDefSubmit(2);
            }}
            type="primary"
            disabled={this.state.defTwoSubBtn}
          >
            提交
          </Button>
        </div>
      </div>,
      <div className="listItemWrap">
        <div
          className="optlabel"
          ref={defthree => {
            this.defthree = defthree;
          }}
          onClick={() => {
            this.handleDefSelect(3);
          }}
        >
          <Radio
            value="three"
            checked={this.state.defSelect === "three"}
            style={{ color: `${green}` }}
          >
            三号防区
          </Radio>
        </div>
        <div className="optlabel" style={{ width: "100%" }}>
          <span>检测类型</span>
          <span style={{ marginLeft: "40px" }}>
            <Checkbox.Group
              options={checkType}
              defaultValue={[0]}
              onChange={cv => this.handleTypeChange(cv, 3)}
            />
          </span>
        </div>

        <div className="optbtn">
          <Button
            onClick={() => {
              this.handleDefAdd();
            }}
            disabled={this.state.defThreeAddBtn}
          >
            添加
          </Button>
          <Button
            onClick={() => {
              this.handleDefDelete(3);
            }}
            type="danger"
            disabled={this.state.defThreeDelBtn}
          >
            删除
          </Button>
          <Button
            onClick={() => {
              this.handleDefSubmit(3);
            }}
            type="primary"
            disabled={this.state.defThreeSubBtn}
          >
            提交
          </Button>
        </div>
      </div>,
      <div className="listItemWrap">
        <div className="optbtn">
          <Button type="dashed" className="again" onClick={this.getBaseMapAnew}>
            重新获取底图
          </Button>
        </div>
      </div>
    ];
    const formItemLayout = {
      labelCol: {
        sm: { span: 7 }
      },
      wrapperCol: {
        sm: { span: 12 }
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="equipset">
        {this.props.match.params.add === ":add" && this.state.addOnly === true && (
          <div className="onlyadd">
            <div className="baseInfo">基本信息</div>
            <Form
              {...formItemLayout}
              key="changeform"
              onSubmit={this.handleAdd}
              className="formInfo"
            >
              <Row>
                <Col span={10}>
                  <Row>
                    <Form.Item label="摄像头名称">
                      {getFieldDecorator("name", {
                        rules: [
                          {
                            required: true,
                            message: "请输入摄像头名称!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="IP地址">
                      {getFieldDecorator("ip", {
                        rules: [
                          {
                            required: true,
                            message: "请输入IP地址!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="摄像头类型">
                      {getFieldDecorator("ipctype", {
                        initialValue: "hikvision"
                      })(
                        <Select>
                          <Option key="1" value="hikvision">
                            海康威视
                          </Option>
                          <Option key="2" value="dahua">
                            浙江大华
                          </Option>
                          <Option key="3" value="tiandy">
                            天地伟业
                          </Option>
                          <Option key="4" value="uniview">
                            浙江宇视
                          </Option>
                          <Option key="5" value="aebell">
                            美电贝尔
                          </Option>
                          <Option key="6" value="other">
                            其他
                          </Option>
                        </Select>
                      )}
                    </Form.Item>
                    <Form.Item label="管理端口">
                      {getFieldDecorator("authport", {
                        rules: [
                          {
                            required: true,
                            message: "请输入管理端口!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="管理用户名">
                      {getFieldDecorator("ausername", {
                        rules: [
                          {
                            required: true,
                            message: "请输入管理用户名!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="管理密码">
                      {getFieldDecorator("apassword", {
                        rules: [
                          {
                            required: true,
                            message: "请输入管理密码!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Form.Item label="视频传输协议">
                      {getFieldDecorator("protocol", {
                        initialValue: "rtsp"
                      })(
                        <Select>
                          <Option key="1" value="rtsp">
                            rtsp
                          </Option>
                          <Option key="2" value="其它">
                            其它
                          </Option>
                        </Select>
                      )}
                    </Form.Item>
                    <Form.Item label="视频流地址">
                      {getFieldDecorator("streamport", {
                        rules: [
                          {
                            required: true,
                            message: "请输入视频流地址!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                  </Row>
                </Col>
                <Col span={10}>
                  <Row style={{ marginBottom: "20px" }}>
                    <Form.Item label="视频用户名">
                      {getFieldDecorator("vusername", {})(<Input />)}
                    </Form.Item>
                    <Form.Item label="视频密码">
                      {getFieldDecorator("vpassword", {})(<Input />)}
                    </Form.Item>
                  </Row>
                  <Form.Item label="场景">
                    {getFieldDecorator("scene", {
                      initialValue: "室外"
                    })(
                      <Select>
                        <Option key="1" value="室外">
                          室外
                        </Option>
                        <Option key="2" value="室内">
                          室内
                        </Option>
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="场距">
                    {getFieldDecorator("fielddistance", {
                      initialValue: "10~20米"
                    })(
                      <Select>
                        <Option key="1" value="10~20米">
                          10~20米
                        </Option>
                        <Option key="2" value="20~40米">
                          20~40米
                        </Option>
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="报警间隔时间" className="sliderWrap">
                    {getFieldDecorator("frozentime", {
                      initialValue: 5
                    })(
                      <Slider
                        step={1}
                        min={1}
                        max={10}
                        marks={{
                          1: "1",
                          10: "10"
                        }}
                        tooltipVisible={false}
                        className="frozentime"
                        onChange={value => this.handleFrozenChange(value)}
                      />
                    )}
                    <span className="sliderVal">{this.state.frozentime}</span>
                  </Form.Item>
                  <Form.Item label=" 是否强制报警">
                    {getFieldDecorator("alarmtype", {
                      initialValue: false
                    })(<Switch />)}
                  </Form.Item>
                  <Form.Item label="设备智能分析阈值" className="sliderWrap">
                    {getFieldDecorator("threshold", {
                      initialValue: 5
                    })(
                      <Slider
                        step={1}
                        min={1}
                        max={10}
                        marks={{
                          1: "1",
                          10: "10"
                        }}
                        tooltipVisible={false}
                        className="thresholdset"
                        onChange={value => this.handleThresholdChange(value)}
                      />
                    )}
                    <span className="sliderVal">{this.state.threshold}</span>
                  </Form.Item>
                  <Form.Item
                    label=" "
                    colon={false}
                    style={{ textAlign: "center" }}
                  >
                    <Button type="primary" htmlType="submit">
                      确定
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        )}
        {(this.state.addOnly === false || this.props.query.code) && (
          <Fragment>
            <div className="topbtn">
              <Button type="primary" onClick={() => this.handleBack()}>
                返回
              </Button>
              <Button
                disabled={this.state.unlock}
                type="primary"
                onClick={() => this.handleUnlock()}
              >
                启用
              </Button>
              <Button
                type="danger"
                disabled={this.state.disabledStopSer}
                onClick={() => this.handleStop()}
              >
                停止服务
              </Button>
              <Button
                type="primary"
                disabled={this.state.disabled24}
                onClick={() => this.handleTwentyFour()}
              >
                24小时设防
              </Button>
              <Button
                type="primary"
                disabled={this.state.disabledRecover}
                onClick={() => this.handleRecover()}
              >
                恢复
              </Button>

              <Button type="danger" onClick={() => this.handleDeviceDel()}>
                删除
              </Button>
            </div>
            <Tabs
              defaultActiveKey="0"
              type="card"
              onChange={activekey => {
                this.handleTabChange(activekey);
              }}
            >
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
                    <span className="baseInfo">基本信息</span>
                  </span>
                }
                key="0"
              >
                <Form
                  {...formItemLayout}
                  key="changeform"
                  onSubmit={this.handleChangeInfo}
                  className="formInfo"
                >
                  <Row>
                    <Col span={10}>
                      <Row>
                        <Form.Item label="摄像头名称">
                          {getFieldDecorator("name", {
                            rules: [
                              {
                                required: true,
                                message: "请输入摄像头名称!"
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item label="IP地址">
                          {getFieldDecorator("ip", {
                            rules: [
                              {
                                required: true,
                                message: "请输入IP地址!"
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item label="摄像头类型">
                          {getFieldDecorator("ipctype", {
                            initialValue: "hikvision"
                          })(
                            <Select>
                              <Option key="1" value="hikvision">
                                海康威视
                              </Option>
                              <Option key="2" value="dahua">
                                浙江大华
                              </Option>
                              <Option key="3" value="tiandy">
                                天地伟业
                              </Option>
                              <Option key="4" value="uniview">
                                浙江宇视
                              </Option>
                              <Option key="5" value="aebell">
                                美电贝尔
                              </Option>
                              <Option key="6" value="other">
                                其他
                              </Option>
                            </Select>
                          )}
                        </Form.Item>
                        <Form.Item label="管理端口">
                          {getFieldDecorator("authport", {
                            rules: [
                              {
                                required: true,
                                message: "请输入管理端口!"
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item label="管理用户名">
                          {getFieldDecorator("ausername", {
                            rules: [
                              {
                                required: true,
                                message: "请输入管理用户名!"
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item label="管理密码">
                          {getFieldDecorator("apassword", {
                            rules: [
                              {
                                required: true,
                                message: "请输入管理密码!"
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>
                      </Row>
                      <Row style={{ marginTop: "20px" }}>
                        <Form.Item label="视频传输协议">
                          {getFieldDecorator("protocol", {
                            initialValue: "rtsp"
                          })(
                            <Select>
                              <Option key="1" value="rtsp">
                                rtsp
                              </Option>
                              <Option key="2" value="其它">
                                其它
                              </Option>
                            </Select>
                          )}
                        </Form.Item>
                        <Form.Item label="视频流地址">
                          {getFieldDecorator("streamport", {
                            rules: [
                              {
                                required: true,
                                message: "请输入视频流地址!"
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>
                      </Row>
                    </Col>
                    <Col span={10}>
                      <Row style={{ marginBottom: "20px" }}>
                        <Form.Item label="视频用户名">
                          {getFieldDecorator("vusername", {})(<Input />)}
                        </Form.Item>
                        <Form.Item label="视频密码">
                          {getFieldDecorator("vpassword", {})(<Input />)}
                        </Form.Item>
                      </Row>
                      <Form.Item label="场景">
                        {getFieldDecorator("scene", {
                          initialValue: "室外"
                        })(
                          <Select>
                            <Option key="1" value="室外">
                              室外
                            </Option>
                            <Option key="2" value="室内">
                              室内
                            </Option>
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item label="场距">
                        {getFieldDecorator("fielddistance", {
                          initialValue: "10~20米"
                        })(
                          <Select>
                            <Option key="1" value="10~20米">
                              10~20米
                            </Option>
                            <Option key="2" value="20~40米">
                              20~40米
                            </Option>
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item label="报警间隔时间" className="sliderWrap">
                        {getFieldDecorator("frozentime", {
                          initialValue: 5
                        })(
                          <Slider
                            step={1}
                            min={1}
                            max={10}
                            marks={{
                              1: "1",
                              10: "10"
                            }}
                            tooltipVisible={false}
                            className="frozentime"
                            onChange={value => this.handleFrozenChange(value)}
                          />
                        )}
                        <span className="sliderVal">
                          {this.state.sliderChange
                            ? this.state.frozentime
                            : this.state.equipData.frozentime}
                          s
                        </span>
                      </Form.Item>
                      <Form.Item label=" 是否强制报警">
                        {getFieldDecorator("alarmtype", {
                          initialValue: false
                        })(<Switch />)}
                      </Form.Item>
                      <Form.Item
                        label="设备智能分析阈值"
                        className="sliderWrap"
                      >
                        {getFieldDecorator("threshold", {
                          initialValue: 5
                        })(
                          <Slider
                            step={1}
                            min={1}
                            max={10}
                            marks={{
                              1: "1",
                              10: "10"
                            }}
                            tooltipVisible={false}
                            className="thresholdset"
                            onChange={value =>
                              this.handleThresholdChange(value)
                            }
                          />
                        )}
                        <span className="sliderVal">
                          {this.state.sliderChange
                            ? this.state.threshold
                            : this.state.equipData.threshold}
                        </span>
                      </Form.Item>
                      <Form.Item
                        label=" "
                        colon={false}
                        style={{ textAlign: "center" }}
                      >
                        <Button type="primary" htmlType="submit">
                          确定
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
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
                    <span className="camera">防区设置</span>
                  </span>
                }
                key="1"
              >
                <Row>
                  <div className="cavwrap">
                    <canvas
                      width="704px"
                      height="576px"
                      id="cavcontainer"
                      style={{
                        backgroundImage:
                          // "url(" +
                          // `${this.state.equipData.basemap}`.split(".jpg")[0] +
                          // `?t=${Date.parse(new Date())}.jpg` +
                          // ")",
                          'url("http://192.168.1.176:8112/1000001/channel/1000028.jpg")',
                        backgroundSize: "100% 100%"
                      }}
                      onMouseDown={e => this.mousedown(e)}
                      onMouseUp={this.mouseup}
                      onMouseMove={this.mousemove}
                    />
                  </div>
                  <Col
                    xl={{ span: 7 }}
                    xxl={{ span: 6 }}
                    style={{ marginLeft: "20px" }}
                  >
                    <List
                      className="defopt"
                      bordered
                      dataSource={defopt}
                      renderItem={item => <List.Item>{item}</List.Item>}
                    />
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
                <DefTime
                  code={this.props.query.code}
                  addBackCode={this.state.addBackCode}
                  equipData={this.state.equipData}
                />
              </TabPane>
            </Tabs>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Form.create({})(EquipSet);
