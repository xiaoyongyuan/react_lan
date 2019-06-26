import React, { Component } from 'react';
import { Form, Icon, Input, Button} from "antd";
import axios from '../../axios/index'
import './index.less';
class Login extends Component {

  componentDidMount() {
      axios.login({
          data: {
              account:"admin",
              password:"ddddd",
          }
      }).then((res)=>{
          console.log(res,"222");
      })
  }
  render() {
      const { getFieldDecorator} = this.props.form;
    return (
      <div className="Login">
        <div className="login-title" />
        <div className="logoBor">
            <div className="logoBg" />
            <div className="loginFrame">
              <p>用户登录</p>
                <Form className="logoForm">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: false, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.1)' }} />}
                                placeholder="用户名/邮箱/手机"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item >
                        {getFieldDecorator('password', {
                            rules: [{ required: false, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.1)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="logoBtn">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
