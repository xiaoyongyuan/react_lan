import React, { Component } from 'react';
import {Select} from "antd";
import logoCricle from "../../../style/imgs/logoCricle.png";
import shield from "../../../style/imgs/shield.png";
import './index.less';
const { Option } = Select;
class LayerHeader extends Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }

  render() {
    return (
      <div className="LayerHeader">
          <div className="headerLeft">
              <div className="logo" />
              <div className="logoFont" />
              <div className="secant" />
              <div className="logo-title">A.I.视频警戒系统</div>
          </div>
          <div className="headerRight">
              <div className="header-right"/>
              <Select defaultValue="Admin" style={{width:120}}>
                  <Option value="Admin">Admin</Option>
              </Select>
          </div>
      </div>
    );
  }
}

export default LayerHeader;
