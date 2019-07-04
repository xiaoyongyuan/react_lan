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
  message
} from "antd";
import React, { Component } from "react";
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
class EquipAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addOnly: true,
      addBackCode: "",
      equipData: {},
      typeSelect: [0],
      defSelect: 1,
      src: "",
      cid: "",
      presentlast: [],
      initarea: [
        [152, 188],
        [108, 95],
        [552, 188],
        [240, 299],
        [278, 340],
        [400, 208]
      ],
      newinitarea: [],
      initareaMove: false,
      areaOne: [], //防区一
      areaTwo: [],
      areaThree: [],
      defOneAddBtn: false,
      defTwoAddBtn: false,
      defThreeAddBtn: false,
      defOneDelBtn: true,
      defTwoDelBtn: true,
      defThreeDelBtn: true,
      defOneSubBtn: false,
      defTwoSubBtn: false,
      defThreeSubBtn: false
    };
  }
  componentDidMount() {
    if (this.props.query.code) {
      this.getOne();
    }
    document.body.onmouseup = function() {
      moveswitch = false;
      scopeswitch = false;
    };
  }
  getOne = () => {
    const { setFieldsValue } = this.props.form;
    axios
      .ajax({
        // baseURL: equipmentURL,
        method: "get",
        url: "http://192.168.1.197:8112/api/camera/getone?",
        data: {
          code: this.props.query.code
        }
      })
      .then(res => {
        if (res.success) {
          console.log(res.data, "list");
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
  handleTabChange(activekey) {
    if (activekey === "1") {
      const equipData = this.state.equipData;
      if (equipData.field && equipData.field[1]) {
        this.setState(
          {
            defOneAddBtn: true,
            defOneDelBtn: false,
            defOneSubBtn: true,
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
            defTwoAddBtn: true,
            defTwoDelBtn: false,
            defTwoSubBtn: true,
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
            defThreeAddBtn: true,
            defThreeDelBtn: false,
            defThreeSubBtn: true,
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
            defOneAddBtn: true,
            defOneDelBtn: false,
            defOneSubBtn: true,
            areaOne: equipData.field[1].pointList,
            defTwoAddBtn: true,
            defTowDelBtn: false,
            defTwoSubBtn: true,
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
            defOneAddBtn: true,
            defOneDelBtn: false,
            defOneSubBtn: true,
            areaOne: equipData.field[1].pointList,
            defThreeAddBtn: true,
            defThreeDelBtn: false,
            defThreeSubBtn: true,
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
            defTwoAddBtn: true,
            defTwoDelBtn: false,
            defTwoSubBtn: true,
            areaTwo: equipData.field[2].pointList,
            defThreeAddBtn: true,
            defThreeDelBtn: false,
            defThreeSubBtn: true,
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
            defOneAddBtn: true,
            defOneDelBtn: false,
            defOneSubBtn: true,
            areaOne: equipData.field[1].pointList,
            defTwoAddBtn: true,
            defTwoDelBtn: false,
            defTwoSubBtn: true,
            areaTwo: equipData.field[2].pointList,
            defThreeAddBtn: true,
            defThreeDelBtn: false,
            defThreeSubBtn: true,
            areaThree: equipData.field[3].pointList
          },
          () => {
            this.boundarydraw();
          }
        );
      }
    }
  }
  boundarydraw = () => {
    let ele = document.getElementById("cavcontainer");
    let area = ele.getContext("2d");
    area.clearRect(0, 0, 704, 576);
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
              // baseURL: equipmentURL,
              method: "post",
              url: "http://192.168.1.197:8112/api/camera/add",
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
              // baseURL: equipmentURL,
              method: "put",
              url: "http://192.168.1.197:8112/api/camera/update",
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
  handleTypeChange = cv => {
    console.log(cv);
    this.setState({
      typeSelect: cv
    });
  };
  handleDefSelect = num => {
    switch (num) {
      case 1:
        {
          this.defone.style.background = "#f2f2c7";
          this.deftwo.style.background = "none";
          this.defthree.style.background = "none";
          this.setState({
            defSelect: 1
          });
        }

        break;
      case 2:
        {
          this.defone.style.background = "none";
          this.deftwo.style.background = "#f2f2c7";
          this.defthree.style.background = "none";
          this.setState({
            defSelect: 2
          });
        }

        break;
      case 3:
        {
          this.defone.style.background = "none";
          this.deftwo.style.background = "none";
          this.defthree.style.background = "#f2f2c7";
          this.setState({
            defSelect: 3
          });
        }

        break;

      default:
        break;
    }
  };
  handleDefAdd = () => {
    this.opendraw();
  };
  handleDefDelete = num => {
    switch (num) {
      case 1:
        {
          axios
            .ajax({
              // baseURL: equipmentURL,
              method: "get",
              url: "http://192.168.1.197:8112/api/camera/fielddel",
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
                    this.boundarydraw();
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
              // baseURL: equipmentURL,
              method: "get",
              url: "http://192.168.1.197:8112/api/camera/fielddel",
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
                    this.boundarydraw();
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
              // baseURL: equipmentURL,
              method: "get",
              url: "http://192.168.1.197:8112/api/camera/fielddel",
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
                    this.boundarydraw();
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
  handleDefSubmit = num => {
    switch (num) {
      case 1:
        {
          axios
            .ajax({
              // baseURL: equipmentURL,
              method: "get",
              url: "http://192.168.1.197:8112/api/camera/fieldadd",
              data: {
                code: this.state.addBackCode || this.state.equipData.code,
                keys: 1,
                field: this.state.initareaMove
                  ? JSON.stringify(this.state.newinitarea)
                  : JSON.stringify(this.state.initarea),
                type: JSON.stringify(this.state.typeSelect)
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

                    this.boundarydraw();
                    this.forceUpdate();
                    this.state.newinitarea = [];
                    this.forceUpdate();
                    window.Refresh();
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
              // baseURL: equipmentURL,
              method: "get",
              url: "http://192.168.1.197:8112/api/camera/fieldadd",
              data: {
                code: this.state.addBackCode || this.state.equipData.code,
                keys: 2,
                field: this.state.initareaMove
                  ? JSON.stringify(this.state.newinitarea)
                  : JSON.stringify(this.state.initarea),
                type: JSON.stringify(this.state.typeSelect)
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
                    // areaTwo: this.state.initarea || this.state.newinitarea
                  },
                  () => {
                    this.state.initareaMove
                      ? (this.state.areaTwo = this.state.newinitarea)
                      : (this.state.areaTwo = this.state.initarea);
                    this.boundarydraw();
                    this.forceUpdate();
                    this.state.newinitarea = [];
                    this.forceUpdate();
                    window.Refresh();
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
              // baseURL: equipmentURL,
              method: "get",
              url: "http://192.168.1.197:8112/api/camera/fieldadd",
              data: {
                code: this.state.addBackCode || this.state.equipData.code,
                keys: 3,
                field: this.state.initareaMove
                  ? JSON.stringify(this.state.newinitarea)
                  : JSON.stringify(this.state.initarea),
                type: JSON.stringify(this.state.typeSelect)
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

                    this.boundarydraw();
                    this.forceUpdate();
                    this.state.newinitarea = [];
                    this.forceUpdate();
                    window.Refresh();
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
  opendraw = () => {
    //开始绘制，打开开关
    open = true;
    this.draw();
  };

  draw = (newdata, arc) => {
    //绘制默认的六边形
    //绘制区域
    let item = newdata ? newdata : this.state.initarea;
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
    if (arc) return;
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
      this.setState({ newinitarea: newinitarea, initareaMove: true }, () =>
        this.draw(newinitarea)
      );
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
      this.setState({ newinitarea: newinitarea, initareaMove: true }, () =>
        this.draw(newinitarea)
      );
    }
  };

  render() {
    const checkType = [
      { label: "人员类型", value: 0 },
      { label: "车辆类型", value: 1 }
    ];
    const defopt = [
      <div style={{ width: "100%" }}>
        <span className="optlabel">检测类型</span>
        <span style={{ marginLeft: "40px" }}>
          <Checkbox.Group
            options={checkType}
            defaultValue={[0]}
            onChange={cv => this.handleTypeChange(cv)}
          />
        </span>
      </div>,
      <div
        ref={defone => {
          this.defone = defone;
        }}
        onClick={() => {
          this.handleDefSelect(1);
        }}
      >
        <span className="optlabel">一号防区</span>
        <span className="optbtn">
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
        </span>
      </div>,
      <div
        ref={deftwo => {
          this.deftwo = deftwo;
        }}
        onClick={() => {
          this.handleDefSelect(2);
        }}
      >
        <span className="optlabel">二号防区</span>
        <span className="optbtn">
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
        </span>
      </div>,
      <div
        ref={defthree => {
          this.defthree = defthree;
        }}
        onClick={() => {
          this.handleDefSelect(3);
        }}
      >
        <span className="optlabel">三号防区</span>
        <span className="optbtn">
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
        </span>
      </div>,
      <Button className="again">重新获取底图</Button>
    ];
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 }
      },
      wrapperCol: {
        sm: { span: 10 }
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="equipset">
        {this.props.match.params.add === ":add" && this.state.addOnly === true && (
          <div className="onlyadd">
            <div className="baseinfo">基本信息</div>
            <Row>
              <Col span={14}>
                <Form
                  {...formItemLayout}
                  key="addform"
                  onSubmit={this.handleAdd}
                >
                  <Form.Item label="摄像头名称">
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your name!"
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
                  <Form.Item label="IP地址">
                    {getFieldDecorator("ip", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your ip!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="管理端口">
                    {getFieldDecorator("authport", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your authport!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="管理用户名">
                    {getFieldDecorator("ausername", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your ausername!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="管理密码">
                    {getFieldDecorator("apassword", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your apassword!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  {/* <Form.Item label="摄像头厂家">
                    {getFieldDecorator("vender", {
                      initialValue: 1
                    })(
                      <Select>
                        <Option key="1" value={1}>
                          海康
                        </Option>
                      </Select>
                    )}
                  </Form.Item> */}
                  <Form.Item label="视频流地址">
                    {getFieldDecorator("streamport", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your streamport!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="视频用户名">
                    {getFieldDecorator("vusername", {})(<Input />)}
                  </Form.Item>
                  <Form.Item label="视频密码">
                    {getFieldDecorator("vpassword", {})(<Input />)}
                  </Form.Item>
                  <Form.Item label="视频传输协议">
                    {getFieldDecorator("Protocol", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your streamport!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label=" 设备智能分析阈值">
                    {getFieldDecorator("threshold", {
                      initialValue: 5
                    })(
                      <Slider
                        step={1}
                        min={1}
                        max={10}
                        className="thresholdset"
                      />
                    )}
                  </Form.Item>
                  <Form.Item label=" 冷冻时间">
                    {getFieldDecorator("frozentime", {
                      initialValue: 5
                    })(
                      <Slider
                        step={1}
                        min={1}
                        max={10}
                        className="frozentime"
                      />
                    )}
                  </Form.Item>
                  <Form.Item label=" 是否强制报警">
                    {getFieldDecorator("alarmtype", {
                      initialValue: false
                    })(<Switch />)}
                  </Form.Item>
                  <Form.Item label=" " colon={false}>
                    <Button type="primary" htmlType="submit">
                      确定
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        )}
        {(this.state.addOnly === false || this.props.query.code) && (
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
                  <span className="info">基本信息</span>
                </span>
              }
              key="0"
            >
              <Row>
                <Col span={14}>
                  <Form
                    {...formItemLayout}
                    key="changeform"
                    onSubmit={this.handleChangeInfo}
                  >
                    <Form.Item label="摄像头名称">
                      {getFieldDecorator("name", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your name!"
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
                    <Form.Item label="IP地址">
                      {getFieldDecorator("ip", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your ip!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="管理端口">
                      {getFieldDecorator("authport", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your authport!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="管理用户名">
                      {getFieldDecorator("ausername", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your ausername!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="管理密码">
                      {getFieldDecorator("apassword", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your apassword!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    {/* <Form.Item label="摄像头厂家">
                    {getFieldDecorator("vender", {
                      initialValue: 1
                    })(
                      <Select>
                        <Option key="1" value={1}>
                          海康
                        </Option>
                      </Select>
                    )}
                  </Form.Item> */}
                    <Form.Item label="视频流地址">
                      {getFieldDecorator("streamport", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your streamport!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="视频用户名">
                      {getFieldDecorator("vusername", {})(<Input />)}
                    </Form.Item>
                    <Form.Item label="视频密码">
                      {getFieldDecorator("vpassword", {})(<Input />)}
                    </Form.Item>
                    <Form.Item label="视频传输协议">
                      {getFieldDecorator("Protocol", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your streamport!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label=" 设备智能分析阈值">
                      {getFieldDecorator("threshold", {
                        initialValue: 5
                      })(
                        <Slider
                          step={1}
                          min={1}
                          max={10}
                          className="thresholdset"
                        />
                      )}
                    </Form.Item>
                    <Form.Item label=" 冷冻时间">
                      {getFieldDecorator("frozentime", {
                        initialValue: 5
                      })(
                        <Slider
                          step={1}
                          min={1}
                          max={10}
                          className="frozentime"
                        />
                      )}
                    </Form.Item>
                    <Form.Item label=" 是否强制报警">
                      {getFieldDecorator("alarmtype", {
                        initialValue: false
                      })(<Switch />)}
                    </Form.Item>
                    <Form.Item label=" " colon={false}>
                      <Button type="primary" htmlType="submit">
                        确定
                      </Button>
                    </Form.Item>
                  </Form>
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
                  <span className="camera">防区设置</span>
                </span>
              }
              key="1"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <div className="cavwrap">
                    <canvas
                      width="704px"
                      height="576px"
                      id="cavcontainer"
                      style={{
                        backgroundImage: `url(${backdrop})`,
                        backgroundSize: "100% 100%"
                      }}
                      onMouseDown={e => this.mousedown(e)}
                      onMouseUp={this.mouseup}
                      onMouseMove={this.mousemove}
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={11}>
                      <List
                        className="defopt"
                        bordered
                        dataSource={defopt}
                        renderItem={item => <List.Item>{item}</List.Item>}
                      />
                    </Col>
                  </Row>
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
        )}
      </div>
    );
  }
}

export default Form.create({})(EquipAdd);
