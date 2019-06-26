import React, { Component } from 'react';
import {Form,Button,Input,Select,DatePicker } from "antd";
import "../../style/ztt/css/operational.css";
import Etable from "../common/Etable";
import moment from 'moment';
const { Option } = Select;
const {RangePicker } = DatePicker;
class Operational extends Component{
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
    }
    render() {
        const { getFieldDecorator} = this.props.form;
        const columns=[
            {
                title: 'ID',
                dataIndex: 'index',
                render: (text, record,index) => (index+1),
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: '用户名',
                dataIndex: 'name',
            },
            {
                title: '最近登时间',
                dataIndex: 'times',
            },
            {
                title: '操作类型',
                dataIndex: 'types',
            },
            {
                title: '操作信息',
                dataIndex: 'context',
            }
        ];
        return (
            <div className="operational">
                <div className="formLin">
                    <Form layout="inline" onSubmit={this.handleSubmit} >
                        <Form.Item label="操作类型">
                            {getFieldDecorator('username', {
                                rules: [{ required: false, message: 'Please input your username!' }],
                                initialValue:"0"
                            })(
                                <Select>
                                    <Option value="0">全部</Option>
                                    <Option value="1">全部</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="用户名">
                            {getFieldDecorator('password', {
                                rules: [{ required: false, message: 'Please input your Password!' }],
                            })(
                                <Input/>,
                            )}
                        </Form.Item>
                        <Form.Item label="操作时间">
                            {getFieldDecorator('password', {
                                rules: [{ required: false, message: 'Please input your Password!' }],
                            })(
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
                />
            </div>
        );
    }
}
export default Operational=Form.create({})(Operational);