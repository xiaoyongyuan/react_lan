import React, { Component } from 'react';
import {Form,Input,Modal} from "antd";
class GroupModel extends Component{
    reset=()=>{
        this.props.form.resetFields();
        this.props.uploadreset()
    };
    handleFilterSubmit = ()=>{//查询提交
        const _this=this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var data={};
                data.name=values.name;
                // data.filepath=values.filepath.fileList[0].url;
                // data.oldfilename = values.filepath.fileList[0].name;
                // data.memo=values.memo;
                // data.projectid=values.projectid;
                _this.props.filterSubmit(data);
                _this.props.form.resetFields();
                _this.reset();
            }
        });

    };
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 16
            }
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title={this.props.groupType===0?"新增分组":"编辑分组"}
                visible={this.props.visible}
                onCancel={this.reset}
                onOk={this.handleFilterSubmit}
            >
                <Form {...formItemLayout}>
                    <Form.Item label="名称">
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: false,
                                    message: 'Please input your E-mail!',
                                }
                            ],
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
export default GroupModel=Form.create({})(GroupModel);