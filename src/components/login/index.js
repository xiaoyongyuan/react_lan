import React, { Component } from 'react';
import { Form, Icon, Input, Button,message} from "antd";
import axios from '../../axios/index';
import logo from "../../style/imgs/logo.png";
import './index.less';
class Login extends Component {

  componentDidMount() {

  }
  hanleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.login({
                    data:{
                        account:values.account,
                        password:values.password,
                    }
                }).then((res)=>{
                    if(res.success && res.data){
                        localStorage.setItem("account", res.data.datainfo.account);
                        localStorage.setItem("companycode", res.data.datainfo.companycode);
                        localStorage.setItem("token", res.data.token);
                        this.props.history.push("/main/index");
                    }else{
                        message.warn('用户名或密码错误！');
                    }
                })

            }
        });
    };
  render() {
      const { getFieldDecorator} = this.props.form;
    return (
      <div className="Login">
          <div className="login-title" >
            <img src={logo} alt=""/>
          </div>
        <div className="logoBor">
            <div className="logoBg" />
            <div className="loginFrame">
              <p>用户登录</p>
                <Form className="logoForm" onSubmit={this.hanleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('account', {
                            rules: [{ required: true, message: '请输入用户名/邮箱/手机号!' }],
                        })(
                            <Input placeholder="用户名/邮箱/手机号" />,
                        )}
                    </Form.Item>
                    <Form.Item >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input type="password" placeholder="密码" />,
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
