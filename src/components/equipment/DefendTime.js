import React, { Component } from "react";
import $ from "jquery";
import "../../style/jhy/less/defendTime.less";
import "../../style/jhy/js/dfTime.js";
class DefendTime extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    var def = $("#defend").initDefend({
      width: 760
    });
    $("#getdata").click(function() {
      var backdata = def.getdata();
      console.log(backdata);
      $("#answer").html(JSON.stringify(backdata));
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
        <button id="getdata">获得数据</button>
        <div id="answer" />
      </div>
    );
  }
}

export default DefendTime;
