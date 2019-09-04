import React, { Component } from 'react';
import {Icon,Modal} from "antd";
import './index.less';
//reudux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postReducer } from '../../../action/sckoetAction';
const confirm = Modal.confirm;

class LayerHeader extends Component {
    constructor(props) {
      super(props);
      this.state = {
          alarmNum:''
      };
    }
    componentDidMount() {
        this.setState({
            account:localStorage.getItem("account")
        });
        this.props.postReducer();
    }
    componentWillUpdate(nextProps,nextState) {
        this.state.alarmNum=nextProps.alarNums;
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
              <div className="secant" />
              <div className="logo-title">A.I.视频警戒系统</div>
          </div>
          <div className="headerRight">
              <div className="alarmNum">
                  <span className="alarmfont">最新报警数：</span>{this.state.alarmNum}
              </div>
              <div className="alarmRight">
                  <div className="header-right"/>
                  <span>{this.state.account}</span>
                  <Icon type="poweroff" className="signout" onClick={this.hanleClose} />
              </div>
          </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
    alarNums:state.postReducer.num,
});
LayerHeader.propTypes = {
    postReducer: PropTypes.func.isRequired,
};
export default connect(mapStateToProps,{postReducer})(LayerHeader);
