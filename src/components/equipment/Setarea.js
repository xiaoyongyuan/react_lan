import React, { Component } from "react";
import { Row, Col, Button, Modal } from "antd";
// import "../../style/jhy/css/setarea.css";
// import { post } from "../../axios/tools";
const blue = "#5063ee";
const red = "#ED2F2F";
const maskcol = "rgba(204, 204, 204, 0.3)";
var open = false;
var moveswitch = false;
var scopeswitch = false;
class Setarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
      cid: "",
      clicknum: 0,
      presentlast: [],
      // initarea: [[152, 188], [352, 188], [552, 188], [552, 388], [152, 388]],
      initarea: [[152, 188], [108, 95], [552, 188], [240, 299], [152, 388]],
      areaone: [], //防区一
      areatwo: []
    };
  }
  componentWillMount = () => {
    this.setState({
      cid: this.props.query.id
    });
  };
  boundarydraw() {
    let ele = document.getElementById("cavcontainer");
    let area = ele.getContext("2d");
    area.clearRect(0, 0, 704, 576);
    if (this.state.areaone.length > 0) {
      let areaone = this.state.areaone;
      area.strokeStyle = blue;
      area.fillStyle = maskcol;
      area.lineWidth = 2;
      area.beginPath();
      area.moveTo(areaone[0][0], areaone[0][1]);
      areaone.map((elx, i) => {
        if (i > 0) {
          area.lineTo(areaone[i][0], areaone[i][1]);
          if (i === 4) {
            area.lineTo(areaone[0][0], areaone[0][1]);
          }
        }
      });
      area.stroke();
      area.fill();
      areaone.map(val => {
        area.beginPath();
        area.fillStyle = "rgba(128, 100, 162, 0.7)";
        area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
        area.fill();
      });
      if (this.state.areatwo.length > 0) {
        let areatwo = this.state.areatwo;
        area.fillStyle = maskcol;
        area.strokeStyle = red;
        area.lineWidth = 2;
        area.beginPath();
        area.moveTo(areatwo[0][0], areatwo[0][1]);
        areatwo.map((elx, i) => {
          if (i > 0) {
            area.lineTo(areatwo[i][0], areatwo[i][1]);
            if (i === 4) {
              area.lineTo(areatwo[0][0], areatwo[0][1]);
            }
          }
        });
        area.stroke();
        area.fill();
        areatwo.map(val => {
          area.beginPath();
          area.fillStyle = "rgba(128, 100, 162, 0.7)";
          area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
          area.fill();
        });
      }
    } else if (this.state.areatwo.length > 0) {
      let areatwo = this.state.areatwo;
      area.strokeStyle = red;
      area.fillStyle = maskcol;
      area.lineWidth = 2;
      area.beginPath();
      area.moveTo(areatwo[0][0], areatwo[0][1]);
      areatwo.map((elx, i) => {
        if (i > 0) {
          area.lineTo(areatwo[i][0], areatwo[i][1]);
          if (i === 4) {
            area.lineTo(areatwo[0][0], areatwo[0][1]);
          }
        }
      });
      area.stroke();
      area.fill();
      areatwo.map(val => {
        area.beginPath();
        area.fillStyle = "rgba(128, 100, 162, 0.7)";
        area.arc(val[0], val[1], 10, 0, 2 * Math.PI);
        area.fill();
      });
    }
  }
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
    //判断鼠标是否在左边点临界范围内
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
  getarr = a => {
    //取出最大最小值
    let item = this.state.initarea;
    var arr = [];
    item.map((item, i) => {
      arr.push(item[a]);
    });
    return { min: Math.min(...arr), max: Math.max(...arr) };
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
  opendraw = () => {
    //开始绘制，打开开关
    open = true;
    this.draw();
  };

  draw = (newdata, arc) => {
    //绘制默认的五边形
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
        if (i === 4) {
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
    if (this.state.newinitarea) {
      this.setState({ initarea: this.state.newinitarea }); //更新数组
    }
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
      initarea[movedot - 1] = [getcoord.x, getcoord.y];
      this.setState({ initarea }, () => this.draw());
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
      this.setState({ newinitarea: newinitarea }, () => this.draw(newinitarea));
    }
  };

  componentDidMount() {
    const _this = this;
  }

  render() {
    return (
      <div className="setarea">
        <div className="topcont clearfix">
          <div className="cavwrap">
            <canvas
              width="704px"
              height="576px"
              id="cavcontainer"
              style={{
                backgroundImage: `url('http://pic01.aokecloud.cn/alarm/1000004/background/efa61zz7.jpg')`,
                backgroundSize: "100% 100%"
              }}
              onMouseDown={e => this.mousedown(e)}
              onMouseUp={this.mouseup}
              onMouseMove={this.mousemove}
            />
          </div>

          <div className="optbtn">
            <Button type="primary" className="queryBtn" onClick={this.opendraw}>
              添加防区
            </Button>
            <Button type="primary" className="queryBtn">
              确认提交
            </Button>
          </div>
        </div>
        <div className="areaexplain">
          <p>
            围界设定方法：
            <br />
            单击添加防区后根据需求鼠标拖动缩放防区大小或移动防区位置，
            每个设备最多可设置两处防区。防区绘制完成后请点击“确定添加”按钮生效。
          </p>
        </div>
      </div>
    );
  }
}

export default Setarea;
