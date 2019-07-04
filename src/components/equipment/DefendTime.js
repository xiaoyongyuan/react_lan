import React, { Component } from "react";
import $ from "jquery";
import "../../style/jhy/less/defendTime.less";
import "../../style/jhy/js/dfTime.js";
import axios from "../../axios";
import { Button, Row, Col } from "antd";
class DefendTime extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    var def = $("#defend").initDefend({
      width: 760
    });
    $("#getData").click(function() {
      var backdata = def.getdata();
      $("#answer").html(JSON.stringify(backdata));
    });

    $("#submitData").click(function() {
      // var backdata = def.getdata();
      // axios
      //   .ajax({
      //     // baseURL: equipmentURL,
      //     method: "get",
      //     url: "http://192.168.1.163:8111/api/workingTime/setWorkingTime",
      //     data: { timelist: backdata}
      //   })
      //   .then(res => {
      //     if (res.success) {
      //     }
      //   });
      var res = [
        [
          { starttime: "07:00", endtime: "12:00" },
          { starttime: "17:00", endtime: "22:30" },
          { starttime: "14:00", endtime: "16:00" }
        ],
        [
          { starttime: "13:00", endtime: "18:00" },
          { starttime: "08:30", endtime: "11:30" }
        ],
        [{ starttime: "14:30", endtime: "21:00" }],
        [],
        [],
        [],
        []
      ];

      function bubbleSort(array) {
        for (var unfix = array.length - 1; unfix > 0; unfix--) {
          for (var i = 0; i < unfix; i++) {
            if (array[i][0] > array[i + 1][0]) {
              var temp = array[i];
              array.splice(i, 1, array[i + 1]);
              array.splice(i + 1, 1, temp);
            }
          }
        }
        return array;
      }

      function getResult(array) {
        var arrayresult = [];
        var sortarray = bubbleSort(array);
        var temp = sortarray[0];
        console.log("排序后：");
        console.log(sortarray);
        for (var i = 0; i < sortarray.length; i++) {
          if (!sortarray[i + 1]) {
            arrayresult.push(temp);
            break;
          }
          if (temp[1] < sortarray[i + 1][0]) {
            arrayresult.push(temp);
            temp = sortarray[i + 1];
          } else {
            if (temp[1] <= sortarray[i + 1][1]) {
              temp = [temp[0], sortarray[i + 1][1]];
            } else {
              temp = [temp[0], temp[1]];
            }
          }
        }
        console.log("小仙女变身后：");
        console.log(arrayresult);
        // var huanyuan = [];
        // for (var j = 0; j < arrayresult.length; j++) {
        //   huanyuan.push([arrayresult[j][0], arrayresult[j][1] - arrayresult[j][0]]);
        // }
        // return huanyuan;
        return arrayresult;
      }

      getResult(res);

      function getRecover(time) {
        var navwidth = 760 - 90;
        var perwidth = navwidth / 48;
        const a = parseInt(time.split(":")[0] * perwidth * 2);
        const b =
          time.split(":")[1].indexOf("3") != -1 ? parseInt(perwidth) : 0;
        return a + b;
      }
      var str;

      for (var i = 0; i < 7; i++) {
        for (var j = 0; j < res[i].length; j++) {
          str = `<div class="item" style="left:${getRecover(
            res[i][j].starttime
          )}px;width:${getRecover(res[i][j].endtime) -
            getRecover(res[i][j].starttime)}px" ></div >`;
          $($(".weekday")[i])
            .find(".bar")
            .append($(str));
        }
      }
    });

    $("#deleteData").click(function() {
      $(".weekday")
        .find(".item")
        .css("width", 0);
    });
  }
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
        <div className="defend" id="defend" />
        <Row>
          <Col span={12} style={{ textAlign: "center" }}>
            <Button id="getData">获得数据</Button>
            <Button id="deleteData" type="danger">
              删除
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
        <div id="answer" />
      </div>
    );
  }
}

export default DefendTime;
