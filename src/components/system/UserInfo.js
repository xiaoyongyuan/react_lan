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

const FormModal = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    componentDidMount() {
      const { currentRecordData, form } = this.props;
      form.setFields({
        account: currentRecordData.account ? currentRecordData.account : "",
        realname: currentRecordData.realname ? currentRecordData.realname : "",
        emailaddress: currentRecordData.emailaddress
          ? currentRecordData.emailaddress
          : "",
        utype: currentRecordData.utype ? currentRecordData.utype : 0
      });
    }

    render() {
      const { visible, onCancel, onCreate, form, title } = this.props;
      const { getFieldDecorator } = form;
      const formlayout = {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 16
        }
      };
      return (
        <Modal
          visible={visible}
          title={`${title}用户`}
          okText="确定"
          canCelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form {...formlayout}>
            <Form.Item label="账号" key="account">
              {getFieldDecorator("account", {
                rules: [
                  {
                    required: true,
                    message: "请输入账号!"
                  }
                ]
              })(<Input maxLength={10} readOnly={title === "编辑"} />)}
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
                initialValue: 0
              })(
                <Select>
                  <Option value={0}>管理员</Option>
                  <Option value={1}>普通用户</Option>
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: [],
      visible: false,
      type: "",
      title: "",
      currentRecordData: {}
    };
  }
  componentDidMount() {
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
  showModel = opt => {
    if (opt === "add") {
      this.setState({
        visible: true,
        title: "新增"
      });
    } else {
      this.setState({
        visible: true,
        title: "编辑",
        currentRecordData: opt
      });
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  handleForm = () => {
    const { form } = this.formRef.props;

    if (this.state.title === "新增") {
      form.validateFields((err, values) => {
        if (!err) {
          this.setState({
            visible: false
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
              form.resetFields();
            }
          });
        } else {
          message.error(err);
          return;
        }
      });
    } else {
      form.validateFields((err, values) => {
        if (!err) {
          this.setState({
            visible: false
          });
          axios({
            method: "post",
            url: "http://192.168.1.176:8111/api/system/setuser",
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
              message.success("编辑用户成功");
              this.getUserData();
              form.resetFields();
            }
          });
        } else {
          message.error(err);
          return;
        }
      });
    }
  };

  // delUser = code => {};
  render() {
    const ifsys = localStorage.getItem("ifsys");
    const utype = localStorage.getItem("utype");
    const account = localStorage.getItem("account");
    const userlist = [
      {
        title: "序号",
        align: "center",
        key: "num",
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
          if (ifsys === "1") {
            if (account == record.account) {
              return null;
            } else {
              return (
                <span>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.showModel("add");
                    }}
                  >
                    新增
                  </Button>
                  <Divider type="vertical" />
                  <Button
                    type="dashed"
                    onClick={() => {
                      this.showModel(record);
                    }}
                  >
                    编辑
                  </Button>
                  <Divider type="vertical" />
                  <Button type="danger">删除</Button>
                </span>
              );
            }
          } else {
            if (utype === "0") {
              if (account == record.account) {
                return (
                  <span>
                    <Button
                      type="primary"
                      onClick={() => {
                        this.showModel("add");
                      }}
                    >
                      新增
                    </Button>
                    <Divider type="vertical" />
                    <Button
                      type="dashed"
                      onClick={() => {
                        this.showModel(record);
                      }}
                    >
                      编辑
                    </Button>
                  </span>
                );
              } else {
                return (
                  <span>
                    <Button
                      type="primary"
                      onClick={() => {
                        this.showModel("add");
                      }}
                    >
                      新增
                    </Button>
                    <Divider type="vertical" />
                    <Button
                      type="dashed"
                      onClick={() => {
                        this.showModel(record);
                      }}
                    >
                      编辑
                    </Button>
                    <Divider type="vertical" />
                    <Button type="danger">删除</Button>
                  </span>
                );
              }
            } else {
              return null;
            }
          }
        }
      }
    ];

    return (
      <div className="userInfo">
        <FormModal
          wrappedComponentRef={formRef => (this.formRef = formRef)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleForm}
          title={this.state.title}
          currentRecordData={this.state.currentRecordData}
        />
        <Etable dataSource={this.state.userdata} columns={userlist} />
      </div>
    );
  }
}
export default Form.create({})(UserInfo);
