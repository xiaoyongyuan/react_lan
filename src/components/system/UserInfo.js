import React, { Component } from "react";
import {
  Row,
  Icon,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Divider,
  message
} from "antd";
import Etable from "../common/Etable";
import axios from "axios";
import axiosW from "../../axios/index";
import moment from "moment";
import "../../style/jhy/less/userinfo.less";
const { Option } = Select;
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: "",
      userdata: [],
      addModel: false
    };
  }
  componentDidMount() {
    this.setState({
      loginUser: localStorage.getItem("account")
    });
    this.getUserData();
  }
  getUserData = () => {
    axiosW
      .ajax({
        method: "get",
        url: "http://192.168.1.176:8111/api/system/userlist",
        // url: window.g.loginURL + "/api/system/userlist",
        data: {
          code: this.props.query.code
        }
      })
      .then(res => {
        if (res.success) {
          this.setState({
            userdata: res.data
          });
        }
      });
  };
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
        axios({
          method: "post",
          url: "http://192.168.1.176:8111/api/autocode/auto",
          data: {
            account: values.account,
            emailaddress: values.emailaddress,
            realname: values.realname,
            utype: values.utype,
            ifsys: values.account === "admin" ? 1 : 0,
            companycode: localStorage.getItem("companycode")
          }
        }).then(res => {
          if (res.data.success) {
            message.success("添加用户成功");
            this.getUserData();
            this.props.form.resetFields();
          }
        });
      } else {
        message.error(err);
      }
    });
  };
  handleCancel = () => {
    this.setState({
      addModel: false
    });
  };
  delUser = code => {};
  editUser = code => {};
  render() {
    const ifsys = localStorage.getItem("ifsys");
    const utype = localStorage.getItem("utype");
    const account = localStorage.getItem("account");
    const userlist = [
      {
        title: "序号",
        align: "center",
        render: (text, record, index) => index + 1
      },
      {
        title: "账号",
        dataIndex: "account",
        align: "center"
      },
      {
        title: "用户名",
        dataIndex: "realname",
        align: "center"
      },
      {
        title: "邮箱",
        dataIndex: "emailaddress",
        align: "center"
      },
      {
        title: "最近登录时间",
        dataIndex: "lastlogin",
        align: "center",
        render: text => {
          if (text) {
            return moment(text).format("YYYY-MM-DD HH:mm:ss");
          } else {
            return null;
          }
        }
      },
      {
        title: "角色权限",
        dataIndex: "utype",
        key: "role",
        align: "center",
        render: (text, record) =>
          text === 0 && record.ifsys === 1
            ? "超级管理员"
            : text === 0 && record.ifsys === 0
            ? "管理员"
            : "普通用户"
      },
      {
        title: "操作",
        dataIndex: "utype",
        key: "opt",
        align: "center",
        width: "18%",
        render: (text, record) => {
          if (ifsys === 1) {
            if (account === record.account) {
              return null;
            } else {
              return (
                <span>
                  <Button type="danger">新增</Button>
                  <Divider type="vertical" />
                  <Button type="primary">编辑</Button>
                  <Divider type="vertical" />
                  <Button type="danger">删除</Button>
                </span>
              );
            }
          } else {
            if (utype === 0) {
              if (account == record.account) {
                return (
                  <span>
                    <Button type="danger">新增</Button>
                    <Divider type="vertical" />
                    <Button type="primary">编辑</Button>
                  </span>
                );
              } else {
                return (
                  <span>
                    <Button type="danger">新增</Button>
                    <Divider type="vertical" />
                    <Button type="primary">编辑</Button>
                    <Divider type="vertical" />
                    <Button type="danger">删除</Button>
                  </span>
                );
              }
            } else {
              return null;
            }
          }

          if (
            text === 0 &&
            record.ifsys === 1 &&
            localStorage.getItem("account" === record.account)
          ) {
            return (
              <span>
                <Button disabled={record.ifsys} type="danger">
                  删除
                </Button>
                <Divider type="vertical" />
                <Button
                  disabled={this.state.loginUser === "admin"}
                  type="primary"
                >
                  编辑
                </Button>
              </span>
            );
          } else if (text === 1) {
            return (
              <span>
                <Button
                  // disabled={this.state.loginUser === "admin"}
                  onClick={() => {
                    this.delUser(record.code);
                  }}
                  type="danger"
                >
                  删除
                </Button>
                <Divider type="vertical" />
                <Button
                  // disabled={this.state.loginUser === "admin"}
                  onClick={() => this.editUser(record.code)}
                  type="primary"
                >
                  编辑
                </Button>
              </span>
            );
          } else {
            return null;
          }
        }
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
        <Etable dataSource={this.state.userdata} columns={userlist} />
        <Modal
          title="用户新增"
          visible={this.state.addModel}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form {...formlayout} onSubmit={this.handleAdd}>
            <Form.Item label="账号" key="account">
              {getFieldDecorator("account", {
                rules: [
                  {
                    required: true,
                    message: "请输入账号!"
                  }
                ]
              })(<Input maxLength={10} />)}
            </Form.Item>
            <Form.Item label="用户名" key="realname">
              {getFieldDecorator("realname", {
                rules: [
                  {
                    required: true,
                    message: "请输入账号!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="邮箱地址" key="emailaddress">
              {getFieldDecorator("emailaddress")(<Input />)}
            </Form.Item>
            <Form.Item label="角色权限" key="role">
              {getFieldDecorator("utype", {
                initialValue: 1
              })(
                <Select>
                  <Option value={1}>管理员</Option>
                  <Option value={0}>普通用户</Option>
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
        <Modal
          title="用户编辑"
          visible={this.state.addModel}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form {...formlayout} onSubmit={this.handleAdd}>
            <Form.Item label="账号" key="account">
              {getFieldDecorator("account", {
                rules: [
                  {
                    required: true,
                    message: "请输入账号!"
                  }
                ]
              })(<Input maxLength={10} />)}
            </Form.Item>
            <Form.Item label="用户名" key="realname">
              {getFieldDecorator("realname", {
                rules: [
                  {
                    required: true,
                    message: "请输入账号!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="邮箱地址" key="emailaddress">
              {getFieldDecorator("emailaddress")(<Input />)}
            </Form.Item>
            <Form.Item label="角色权限" key="role">
              {getFieldDecorator("utype", {
                initialValue: 1
              })(
                <Select>
                  <Option value={1}>管理员</Option>
                  <Option value={0}>普通用户</Option>
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
