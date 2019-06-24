import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from "antd";
import axios from '../../axios'

import './index.less';
const FormItem = Form.Item;
class Login extends Component {

  componentDidMount() {

  }



  handleSubmit = e => { //登录提交
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //获取到的表单的值values
        const { fetchData } = this.props;
        axios.login({
          data: {
            passWord:values.passWord,
            userName:values.userName,
          }
        }).then((res)=>{
          if(res.access_token){
            localStorage.setItem("token", res.access_token);
            this.props.history.push("/pandect/mapshow");
          }else{
            message.warn('用户名或密码错误！')
          }
        })        
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="Login" style={{background:'#dff'}}>
          <div className="m-fastspeed-banner"></div>
          <div className="logincont">
            <div className="login-form">
              <div className="login-logo">
                <span>Login</span>
              </div>
              <Form
                onSubmit={this.handleSubmit}
                style={{ maxWidth: "280px", margin: "0 auto" }}>
                <FormItem>
                  {getFieldDecorator("userName", {
                    rules: [{ required: true, message: "请输入用户名!" }]
                  })(
                    <Input
                      placeholder="请输入用户名"
                      prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("passWord", {
                    rules: [{ required: true, message: "请输入密码!" }]
                  })(
                    <Input
                      placeholder="请输入密码"
                      prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                      type="password"
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true
                  })(<Checkbox>记住我</Checkbox>)}
                  {/*<span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>*/}
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ width: "100%" }}
                  >
                    登录
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
      </div>
    );
  }
}

export default Form.create()(Login);
