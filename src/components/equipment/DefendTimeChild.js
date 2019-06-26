import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
// import $ from "jquery";
import "../../style/jhy/less/defendTime.less";
// import "../style/jhy/js/dfTime.js";
class DefendTimeChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cando: true,
      barwidth: 900,
      data1: [
        {
          type: "周一",
          timeSlot: [{ startime: "", endtime: "" }]
        },
        {
          type: "周二",
          timeSlot: [{ startime: "", endtime: "" }]
        },
        {
          type: "周三",
          timeSlot: [{ startime: "", endtime: "" }]
        },
        {
          type: "周四",
          timeSlot: [{ startime: "", endtime: "" }]
        },
        {
          type: "周五",
          timeSlot: [{ startime: "", endtime: "" }]
        },
        {
          type: "周六",
          timeSlot: [{ startime: "", endtime: "" }]
        },
        {
          type: "周日",
          timeSlot: [{ startime: "", endtime: "" }]
        }
      ],
      mousedown: false,
      timedata: [],

      item1show: false,
      item2show: false,
      item3show: false
    };
    this.optdata = {
      item1: [],
      item2: [],
      item3: []
    };
  }
  componentDidMount() {
    this.handopt();
  }

  getDefTime = x => {
    const minute = (x / this.state.barwidth) * 24 * 60;
    var str, h, m;
    h = ("0" + parseInt(minute / 60)).slice(-2);
    m = ("0" + minute / 60).slice(-2);
    str = h + ":" + m;
    return str;
  };

  handopt = () => {
    const _this = this;
    var lastX1 = 0;
    var lastX2 = 0;
    var lastX3 = 0;
    Object.keys(document.getElementsByClassName("item")).forEach(k => {
      document.getElementsByClassName("item")[k].onmousedown = function(e) {
        e.stopPropagation();
        window.event.cancelBubble = true;
        _this.setState(() => {
          _this.state.cando = false;
        });
      };
    });

    if (this.state.cando) {
      document.getElementsByClassName("bar")[0].onmousedown = function(e) {
        if (_this.state.item1show === false) {
          lastX1 = e.pageX - 290;
          _this.setState(() => {
            _this.state.mousedown = true;
          });
          _this.optdata.item1[0] = lastX1;
          console.log("item1点击X坐标", lastX1);
          _this.item1.style.left = e.pageX - 290 + 50 + "px";
        }
        if (_this.state.item1show === true && _this.state.item2show === false) {
          lastX2 = e.pageX - 290;
          console.log("item2点击X坐标", lastX2);

          _this.setState(() => {
            _this.state.mousedown = true;
          });
          _this.optdata.item2[0] = lastX2;
          _this.item2.style.left = e.pageX - 290 + 50 + "px";
        }
        if (
          _this.state.item1show === true &&
          _this.state.item2show === true &&
          _this.state.item3show === false
        ) {
          lastX3 = e.pageX - 290;
          console.log("item3点击X坐标", lastX3);

          _this.setState(() => {
            _this.state.mousedown = true;
          });
          _this.optdata.item3[0] = lastX3;
          _this.item3.style.left = e.pageX - 290 + 50 + "px";
        }
      };
      document.getElementsByClassName("bar")[0].onmousemove = function(e) {
        if (_this.state.mousedown) {
          var curX = e.pageX - 290;
          if (_this.state.item1show === false) {
            var moveX1 = curX - lastX1;
            _this.optdata.item1 = [lastX1, curX];
            _this.item1.style.width = moveX1 + "px";
          }

          if (
            _this.state.item1show === true &&
            _this.state.item2show === false
          ) {
            var moveX2 = curX - lastX2;

            _this.item2.style.width = moveX2 + "px";
            //2交1
            if (lastX2 < lastX1 && lastX2 + moveX2 > lastX1) {
              //2盖1
              if (
                lastX2 + moveX2 >
                lastX1 + parseInt(_this.item1.style.width)
              ) {
                console.log("2盖1 ");

                _this.optdata.item1 = [];
                _this.optdata.item2 = [lastX2, curX];
              }
            }
            _this.optdata.item2 = [lastX2, curX];
          }

          if (
            _this.state.item1show === true &&
            _this.state.item2show === true &&
            _this.state.item3show === false
          ) {
            var moveX3 = curX - lastX3;

            //3交1
            if (lastX3 < lastX1 && lastX3 + moveX3 > lastX1) {
              //3盖1
              if (
                lastX3 + moveX3 >
                lastX1 + parseInt(_this.item1.style.width)
              ) {
                console.log("3盖1 ");
                _this.optdata.item1 = [];
                _this.optdata.item3 = [lastX3, curX];
              }
            }

            //3交2
            if (lastX3 < lastX2 && lastX3 + moveX3 > lastX2) {
              //3盖2
              if (
                lastX3 + moveX3 >
                lastX2 + parseInt(_this.item2.style.width)
              ) {
                console.log("3盖2 ");
                _this.optdata.item2 = [];
                _this.optdata.item3 = [lastX3, curX];
              }
            }

            //2交1
            if (
              lastX2 < lastX1 &&
              lastX2 + parseInt(_this.item2.style.width) > lastX1
            ) {
              //3交2
              if (lastX3 < lastX2 && lastX3 + moveX3 > lastX2) {
                //3盖2
                if (
                  lastX3 + moveX3 >
                  lastX2 + parseInt(_this.item2.style.width)
                ) {
                  console.log("2交1 3盖2 ");
                  _this.optdata.item2 = [];
                  _this.optdata.item3 = [lastX3, curX];
                }
                //3盖（2交1）
                if (
                  lastX3 + moveX3 >
                  lastX1 + parseInt(_this.item1.style.width)
                ) {
                  console.log("3盖（2交1） ");

                  _this.optdata.item1 = [];
                  _this.optdata.item2 = [];
                  _this.optdata.item3 = [lastX3, curX];
                }
              }

              //2盖1
              if (
                lastX2 + parseInt(_this.item2.style.width) >
                lastX1 + parseInt(_this.item1.style.width)
              ) {
                //3交2
                if (lastX3 < lastX2 && lastX3 + moveX3 > lastX2) {
                  //3盖（2盖1）
                  if (
                    lastX3 + moveX3 >
                    lastX1 + parseInt(_this.item1.style.width)
                  ) {
                    console.log("3盖2盖1 ");
                    _this.optdata.item2 = [];
                    _this.optdata.item3 = [lastX3, curX];
                  }
                }
              }
            }

            _this.optdata.item3 = [lastX3, curX];
            _this.item3.style.width = moveX3 + "px";
          }
        }
      };

      document.body.onmouseup = function(e) {
        if (_this.state.mousedown) {
          console.log("抬起================");
          _this.setState(
            () => {
              _this.state.cando = true;
              _this.state.mousedown = false;
            },
            () => {
              if (_this.optdata.item1.length === 2) {
                _this.state.item1show = true;
              }
              if (_this.optdata.item2.length === 2) {
                _this.state.item2show = true;
              }
              if (_this.optdata.item3.length === 2) {
                _this.state.item3show = true;
              }
            }
          );
        }
      };
    }
  };
  resetResultData = () => {
    this.setState({
      item1show: false,
      item2show: false,
      item3show: false
    });
    this.optdata.item1 = [];
    this.optdata.item2 = [];
    this.optdata.item3 = [];
    this.item1.style.width = 0;
    this.item2.style.width = 0;
    this.item3.style.width = 0;
  };
  getResultData = () => {
    const result = [
      [this.optdata.item1],
      [this.optdata.item2],
      [this.optdata.item3]
    ];
    const res = result.sort();
    // res.map((item, key, arr) => {
    //   if (key < 2) {
    //     if (item[1] > arr[key + 1][0]) {
    //       const keyv = arr[key][0];
    //       const keyv2 = arr[key + 1][1];
    //       res.splice(0, 2, [keyv, keyv2]);
    //       if (key === 0) {
    //         res.splice(key, 2, [keyv, keyv2]);
    //       } else {
    //         res.splice(key, 1, [keyv, keyv2]);
    //       }
    //     }
    //   }
    // });
    console.log(res);
    document.getElementById("resultdata").innerHTML = res;
  };
  render() {
    return (
      <div
        className="weekday"
        style={{
          width: "900px"
        }}
        id={this.props.id}
      >
        <div className="day">
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
          <div className="hour" />
        </div>
        <div className={`${this.props.id} bar`}>
          <div
            id="item1"
            className={`${this.props.id} item item1`}
            ref={item => {
              this.item1 = item;
            }}
          />
          <div
            id="item2"
            className={`${this.props.id} item item2`}
            ref={item2 => {
              this.item2 = item2;
            }}
          />
          <div
            id="item3"
            className={`${this.props.id} item item3`}
            ref={item3 => {
              this.item3 = item3;
            }}
          />
        </div>
        <button
          onClick={() => {
            this.resetResultData();
          }}
          style={{
            position: " absolute",
            right: "-50px",
            bottom: "-2px"
          }}
        >
          重置
        </button>
      </div>
    );
  }
}

export default DefendTimeChild;
