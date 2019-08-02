import React, { Component } from 'react';
import {Select,Icon,Modal} from "antd";
import { withRouter } from 'react-router-dom';
import './index.less';
import Socket from "../../../utils/socket";
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
        // this.socketFun();
    }
   /* socketFun(){
        this.socket = new Socket({
            socketUrl: "ws://192.168.1.168:8111/api/webSocket",
            timeout: 5000,
            socketMessage: receive => {
                console.log(receive, "调用中后端返回数据"); //后端返回的数据，渲染页面
            },
            socketClose: msg => {
                console.log(msg, "调用中关闭socket收到的数据");
            },
            socketError: () => {
                console.log("连接建立失败");
            },
            socketOpen: () => {
                console.log("连接建立成功");
                // 心跳机制 定时向后端发数据
                this.taskRemindInterval = setInterval(() => {
                    this.socket.sendMessage({ msgType: 0 });
                }, 30000);
            }
        });
        // 重试创建socket连接;
        try {
            this.socket.connection();
        } catch (e) {
            // 捕获异常，防止js error
            // donothing
        }
    }*/
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
   /* componentWillUnmount(){
        this.socket.onclose();
    }*/
  render() {
    return (
      <div className="LayerHeader">
          <div className="headerLeft">
              <div className="logo" />
              <div className="secant" />
              <div className="logo-title">A.I.视频警戒系统</div>
          </div>
          <div className="headerRight">
              {/*<a href="#/main/policeInformation" className="alarmNum">121223</a>*/}
              <div className="header-right"/>
              <span>{this.state.account}</span>
              <Icon type="poweroff" className="signout" onClick={this.hanleClose} />
          </div>
      </div>
    );
  }
}

export default withRouter(LayerHeader);
