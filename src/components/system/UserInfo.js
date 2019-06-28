import React, { Component } from "react";
import { Row, Icon, Button, Modal, Form, Input, Select } from "antd";
import Etable from "../common/Etable";
import "../../style/jhy/less/userinfo.less";
const { Option } = Select;
const { confirm } = Modal;
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalshow: false
    };
  }
  showAdd = () => {
    const formlayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 16
      }
    };
    const { getFieldDecorator } = this.props.form;
    confirm({
      icon: null,
      className: "adduser",
      content: (
        <Form {...formlayout}>
          <Form.Item label="用户名" key="username">
            {getFieldDecorator("username")(<Input />)}
          </Form.Item>
          <Form.Item label="昵称" key="nickname">
            {getFieldDecorator("nickname")(<Input />)}
          </Form.Item>
          <Form.Item label="角色权限" key="role">
            {getFieldDecorator("role", {
              initialValue: "1"
            })(
              <Select>
                <Option key="1" value="1">
                  管理员
                </Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      )
    });
  };
  userAdd = () => {};
  cancelModal = () => {
    this.setState({
      modalshow: false
    });
  };
  render() {
    const userlist = [
      {
        title: "序号",
        dataIndex: "id",
        align: "center"
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
            <button>删除</button>|<button>编辑</button>|
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
      </div>
    );
  }
}
export default Form.create({})(UserInfo);
