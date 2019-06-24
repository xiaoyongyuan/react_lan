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
        <div className="headerLeft"><span className="logo"/></div>
        <div>
            {/*<Select defaultValue="Admin" style={{ width: 120 }}>
                <Option value="Admin">Admin</Option>
                <Option value="1354435667">1354435667</Option>
            </Select>*/}
        </div>
      </div>
    );
  }
}

export default LayerHeader;
