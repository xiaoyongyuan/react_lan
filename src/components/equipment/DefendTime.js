import React, { Component } from "react";

import "../style/jhy/css/defendTime.css";
import DefendTimeChild from "./DefendTimeChild";

class DefendTime extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
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
        <iframe frameborder="0">
          <DefendTimeChild key="day1" id="day1" bar="1" />
        </iframe>
        <iframe frameborder="0">
          <DefendTimeChild key="day2" id="day2" bar="2" />
        </iframe>
        <iframe frameborder="0">
          <DefendTimeChild key="day3" id="day3" bar="3" />
        </iframe>
        <iframe frameborder="0">
          <DefendTimeChild key="day4" id="day4" bar="4" />
        </iframe>
        <iframe frameborder="0">
          <DefendTimeChild key="day5" id="day5" bar="5" />
        </iframe>
        <iframe frameborder="0">
          <DefendTimeChild key="day6" id="day6" bar="6" />
        </iframe>
        <iframe frameborder="0">
          <DefendTimeChild key="day7" id="day7" bar="7" />
        </iframe>
        <p>
          <button
            onClick={() => {
              this.getResultData();
            }}
          >
            获取数据
          </button>
          <span style={{ marginLeft: "20px" }} id="resultdata" />
        </p>
      </div>
    );
  }
}

export default DefendTime;
