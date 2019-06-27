import React, { Component } from "react";
import { Row, Icon, Button } from "antd";
import Etable from "../common/Etable";
import "../../style/jhy/less/userinfo.less";

class UserInfo extends Component {
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
        align: "center"
      }
    ];
    const userdata = [
      {
        id: "1",
        username: "胡彦斌",
        nickname: "胡彦斌",
        logintime: "13:32",
        role: "管理员"
      },
      {
        id: "12",
        username: "胡彦斌",
        nickname: "胡彦斌",
        logintime: "13:32",
        role: "管理员"
      },
      {
        id: "123",
        username: "胡彦斌",
        nickname: "胡彦斌",
        logintime: "13:32",
        role: "管理员"
      },
      {
        id: "1234",
        username: "胡彦斌",
        nickname: "胡彦斌",
        logintime: "13:32",
        role: "管理员"
      }
    ];
    return (
      <div className="userInfo">
        <Row style={{ padding: "20px 0" }}>
          <Button className="addbtn">
            <Icon type="plus" />
            添加用户
          </Button>
        </Row>
        <Etable dataSource={userdata} columns={userlist} />
      </div>
    );
  }
}
export default UserInfo;
