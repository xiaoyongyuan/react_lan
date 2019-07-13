import React, { Component } from 'react';
import {Form,Button,Input,Select,DatePicker } from "antd";
import "../../style/ztt/css/operational.css";
import Etable from "../common/Etable";
import axios from "../../axios/index";
import moment from 'moment';
const { Option } = Select;
const {RangePicker } = DatePicker;
class Operational extends Component{
    constructor(props){
        super(props);
        this.state={
            operationList:[],
            operationTypeList:[]
        };
    }
    componentDidMount() {
        this.getList();
        this.operationType();
    }
    getList=()=>{
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/logs/getlist",
            data:{}
        }).then((res)=>{
            this.setState({
                operationList:res.data
            })
        })
    };
    operationType=()=>{
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/logs/gettypelist",
            data:{}
        }).then((res)=>{
            let TypeList=[];
           for(var a in res.data){
               TypeList.push({code:a,name:res.data[a]})
           }
            this.setState({
                operationTypeList:TypeList
            })
        })
    };
    disabledDate=(current)=> {
        return current && current < moment().endOf('day');
    }
    range=(start, end) =>{
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledRangeTime=(_, type)=> {
        if (type === 'start') {
            return {
                disabledHours: () => this.range(0, 60).splice(4, 20),
                disabledMinutes: () => this.range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => this.range(0, 60).splice(20, 4),
            disabledMinutes: () => this.range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    };
    handleSubmit=()=>{

    };
    render() {
        const { getFieldDecorator} = this.props.form;
        const columns=[
            {
                title: 'ID',
                dataIndex: 'code',
                render: (text, record,index) => (index+1),
                sorter: (a, b) => a.age - b.age,
                align:"center"
            },
            {
                title: '用户名',
                dataIndex: 'uid',
                render: (record)=>{
                    return(
                        <div>
                            {record.uid}
                        </div>
                    )
                },
                align:"center"
            },
            {
                title: '操作时间',
                dataIndex: 'createon',
                render: (text) => (moment(text).format('YYYY-MM-DD HH:mm:ss')),
                align:"center"
            },
            {
                title: '操作类型',
                dataIndex: 'handletype',
                align:"center"
            },
            {
                title: '操作信息',
                dataIndex: 'handlememo',
                align:"center"
            }
        ];
        return (
            <div className="operational">
                <div className="formLin">
                    <Form layout="inline" onSubmit={this.handleSubmit} >
                        <Form.Item label="操作类型">
                            {getFieldDecorator('handletype', {
                                rules: [{ required: false, message: 'Please input your username!' }],
                                initialValue:" "
                            })(
                                <Select style={{width:120}}>
                                    <Option value=" ">全部</Option>
                                    {
                                        this.state.operationTypeList.map((v,i)=>(
                                            <Option value={v.code}>{v.name}</Option>
                                        ))
                                    }
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="用户名">
                            {getFieldDecorator('uid')(
                                <Input/>,
                            )}
                        </Form.Item>
                        <Form.Item label="操作时间">
                            {getFieldDecorator('data')(
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    disabledTime={this.disabledRangeTime}
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Etable
                    bordered
                    columns={columns}
                    dataSource={this.state.operationList}
                />
            </div>
        );
    }
}
export default Operational=Form.create({})(Operational);