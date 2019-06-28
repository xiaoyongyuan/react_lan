import React, { Component } from 'react';
import { Form, Icon, Input, Button} from "antd";
import axios from '../../axios/index'
import './index.less';
class Login extends Component {

  componentDidMount() {

  }
  hanleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.login({
                    data: {
                        account:values.account,
                        password:values.account,
                    }
                }).then((res)=>{
                    this.props.history.push('/main/index');
                    console.log(res,"222");
                })
            }
        });
    };
  render() {
      const { getFieldDecorator} = this.props.form;
    return (
      <div className="Login">
        <div className="login-title" />
        <div className="logoBor">
            <div className="logoBg" />
            <div className="loginFrame">
              <p>用户登录</p>
                <Form className="logoForm" onClick={this.hanleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('account', {
                            rules: [{ required: true, message: '请输入用户名/邮箱/手机号!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.1)' }} />}
                                placeholder="用户名/邮箱/手机号"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
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
