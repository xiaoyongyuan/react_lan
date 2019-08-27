import React, { Component } from 'react';
import Etable from "../common/Etable";
import GroupModel from "./GroupModel";
import axios from "../../axios/index";
import "../../style/ztt/css/groupManagement.less";
import {Button, Col, Icon, Row, Modal} from "antd";
const confirm = Modal.confirm;
class GroupManagement extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        };
    }
    // 新增、编辑
    uploadOk=()=>{
        this.setState({visible:false});
        const _this=this;
        if(_this.state.groupType===0){
            //新增
            console.log('新增');
        }else{
            //编辑
            console.log('编辑');
        }
    };
    hanleGroupDel=()=>{
        const _this=this;
        confirm({
            title: '确认删除吗？',
            onOk() {
                axios.ajax({
                    method:""
                })
            }
        });
    };
    changeState=(key,val,record,groupType,typecode)=>{
        this.setState(
            {
                [key]:val,
                codetype:record.code,
                [groupType]:typecode,
            }
        )
    };
    render() {
        const data=[
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            }
        ];
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
                title: "操作",
                dataIndex: "oper",
                width:"20%",
                align: "center",
                render:(text,record)=>{
                    return(
                        <div >
                            <Button type="primary" className="operationBtn" onClick={()=>this.changeState('visible',true,record,'groupType',1)}>编辑</Button>
                            <Button type="primary" className="operationBtn" onClick={()=>this.hanleGroupDel(record)}>删除</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className="groupManagement">
                <Button type="primary" className="addGroup" onClick={()=>this.changeState('visible',true,'','groupType',0)}>
                    <Icon type="plus" />
                    新增分组
                </Button>
                <Row>
                    <Col span={24}>
                        <Etable
                            columns={userlist}
                            dataSource={data}
                            style={{ marginTop: "20px"}}
                        />
                    </Col>
                </Row>
                    <GroupModel
                        visible={this.state.visible}
                        filterSubmit={this.uploadOk}
                        groupType={this.state.groupType}
                        uploadreset={()=>this.changeState('visible',false,'','groupType',1)}
                    />
            </div>
        );
    }
}
export default GroupManagement;