import React, { Component } from "react";
import { Row, Icon, Button, Modal, Form, Input, Select } from "antd";
import Etable from "../common/Etable";
import axios from "../../axios/index";
import "../../style/jhy/less/userinfo.less";
const { Option } = Select;
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModel: false
    };
  }
  showAdd = () => {
    this.setState({
      addModel: true
    });
  };
  handleAdd = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          addModel: false
        });
        axios
          .ajax({
            method: "post",
            url: window.g.loginURL + "/api/autocode/auto",
            data: {
              user: values
            }
          })
          .then(res => {
            if (res.success) {
            }
          });
      }
    });
  };
  handleCancel = () => {
    this.setState({
      addModel: false
    });
  };
  render() {
    const userlist = [
      {
        title: "序号",
        dataIndex: "id",
        align: "center",
        render: (text, record, index) => index + 1
      },
      {
        title: "用户名",
        dataIndex: "username",
        align: "center"
      },
      {
        title: "昵称",
        dataIndex: "nickname",
        align: "center"
      },
      {
        title: "最近登录时间",
        dataIndex: "logintime",
        align: "center"
      },
      {
        title: "角色权限",
        dataIndex: "role",
        key: "role",
        align: "center"
      },
      {
        title: "操作",
        dataIndex: "role",
        key: "opt",
        align: "center",
        render: () => (
          <div>
              <span className="del">删除</span><span className="del">编辑</span>
          </div>
        )
      }
    ];
    const userdata = [
      {
        code: "1",
        username: "胡彦斌",
        nickname: "胡彦斌",
        logintime: "13:32",
        role: "管理员"
      },
      {
        code: "12",
        username: "胡彦斌",
        nickname: "胡彦斌",
        logintime: "13:32",
        role: "管理员"
      },
      {
        code: "123",
        username: "胡彦斌",
        nickname: "胡彦斌",
        logintime: "13:32",
        role: "管理员"
      },
      {
        code: "1234",
        username: "胡彦斌",
        nickname: "胡彦斌",
        logintime: "13:32",
        role: "管理员"
      }
    ];
    const formlayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="userInfo">
        <Row style={{ padding: "20px 0" }}>
          <Button
            className="addbtn"
            onClick={() => {
              this.showAdd();
            }}
          >
            <Icon type="plus" />
            添加用户
          </Button>
        </Row>
        <Etable dataSource={userdata} columns={userlist} />
        <Modal
          title="用户新增"
          visible={this.state.addModel}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form {...formlayout} onSubmit={this.handleAdd}>
            <Form.Item label="公司编码" key="companycode">
              {getFieldDecorator("companycode", {
                rules: [
                  {
                    required: true,
                    message: "请输入公司编码!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="用户名" key="username">
              {getFieldDecorator("account")(<Input />)}
            </Form.Item>
            <Form.Item label="昵称" key="nickname">
              {getFieldDecorator("nickname")(<Input />)}
            </Form.Item>
            <Form.Item label="角色权限" key="role">
              {getFieldDecorator("realname", {
                initialValue: "0"
              })(
                <Select>
                  <Option value="0">管理员</Option>
                  <Option value="1">普通用户</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label=" "
              colon={false}
              wrapperCol={{ span: 4, push: 6 }}
            >
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create({})(UserInfo);
