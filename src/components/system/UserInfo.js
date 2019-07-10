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
      console.log(values);
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
            companycode: 100000
          }
        }).then(res => {
          if (res.success) {
            message.success("添加用户成功");
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
        width: "18%",
        render: () => (
          <span>
            <Button type="danger">删除</Button>
            <Divider type="vertical" />
            <Button type="primary">编辑</Button>
          </span>
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
            <Form.Item label="账号" key="account">
              {getFieldDecorator("account", {
                rules: [
                  {
                    required: true,
                    message: "请输入账号!"
                  }
                ]
              })(<Input maxLength="10" />)}
            </Form.Item>
            <Form.Item label="用户名" key="realname">
              {getFieldDecorator("realname")(<Input />)}
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
