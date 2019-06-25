import React, { Component } from "react";
import $ from "jquery";
import "../style/jhy/css/defendTime.css";
import "../style/jhy/js/dfTime.js";
class DefendTime extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    var data3 = [
      {
        startime: "2018-03-07 01:30:00",
        endtime: "2018-03-07 23:00:00"
      },
      {
        startime: "2018-03-08 01:30:00",
        endtime: "2018-03-08 05:30:00"
      },
      {
        startime: "2018-03-05 16:30:00",
        endtime: "2018-03-05 20:30:00"
      },
      {
        startime: "2018-03-05 01:30:00",
        endtime: "2018-03-05 02:00:00"
      }
    ];
    data3 = [];
    var juicy = $("#demo1").initJuicy({
      width: 800,
      mondayDate: "2018-03-05",
      timedata: data3,
      status: true //false表示不能编辑，true可以编辑
    });
    $("#getdata").click(function() {
      var backdata = juicy.getdata();
      console.log(backdata);
      $("#answer").html(JSON.stringify(backdata));
    });
  }
  render() {
    return (
      <div
        className="defendTime"
        style={{
          margin: "20px",
          padding: "20px",
          width: "100%",
          height: "100%"
        }}
      >
        <div className="kaoqing" id="demo1" />
        <button id="getdata">获得数据</button>
        <div id="answer" />
      </div>
    );
  }
}

export default DefendTime;
