import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from "antd";
import './index.less';
const FormItem = Form.Item;
class Login extends Component {

  componentDidMount() {

  }
  render() {
    return (
      <div className="Login">
        登录
      </div>
    );
  }
}

export default Form.create()(Login);
