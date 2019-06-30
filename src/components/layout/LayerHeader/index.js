import React, { Component } from 'react';
import {Select,Icon,Modal} from "antd";
import { withRouter } from 'react-router-dom';
import './index.less';
const { Option } = Select;
const confirm = Modal.confirm;
class LayerHeader extends Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }
    componentDidMount() {
        this.setState({
            account:localStorage.getItem("account")
        })
    }

    hanleClose=()=>{
        const _this=this;
        confirm({
            title: '退出',
            content: '确认退出吗？',
            onOk() {
                _this.props.history.push('/login')
            }
        });
    };
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
              <span>{this.state.account}</span>
              <Icon type="poweroff" className="signout" onClick={this.hanleClose} />
          </div>
      </div>
    );
  }
}

export default withRouter(LayerHeader);
