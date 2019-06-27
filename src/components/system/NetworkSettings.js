import React, { Component } from "react";
import { Row, Col, Form, Radio, Button, Input } from "antd";
import "../../style/jhy/less/netset.less";
class NetworkSettings extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16
      }
    };
    return (
      <div className="netset">
        <Row>
          <Row>
            <Button className="netcard">网卡一配置</Button>
          </Row>
          <Col span={8}>
            <Form {...formItemLayout} colon={false}>
              <Form.Item>
                {getFieldDecorator("autoGetIp", {})(
                  <Radio>自动获取IP地址</Radio>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("userUnderIP", {})(
                  <Radio>使用下面的IP地址</Radio>
                )}
              </Form.Item>
              <Form.Item label="IP号">
                {getFieldDecorator("ip", {})(<Input />)}
              </Form.Item>
              <Form.Item label="子网编码">
                {getFieldDecorator("ip", {})(<Input />)}
              </Form.Item>
              <Form.Item label="默认网关">
                {getFieldDecorator("ip", {})(<Input />)}
              </Form.Item>
              <Form.Item label="DNS1">
                {getFieldDecorator("ip", {})(<Input />)}
              </Form.Item>
              <Form.Item label="DNS2">
                {getFieldDecorator("ip", {})(<Input />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("userUnderIP", {})(<Radio>网络测试</Radio>)}
              </Form.Item>
              <Form.Item label=" ">
                <div className="optwrap">
                  <Button className="submit">确认</Button>
                  <Button className="cancle">取消</Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Row>
            <Button className="netcard">网卡二配置</Button>
          </Row>
          <Col span={8}>
            <Form {...formItemLayout} colon={false}>
              <Form.Item>
                {getFieldDecorator("autoGetIp", {})(
                  <Radio>自动获取IP地址</Radio>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("userUnderIP", {})(
                  <Radio>使用下面的IP地址</Radio>
                )}
              </Form.Item>
              <Form.Item label="IP号">
                {getFieldDecorator("ip", {})(<Input />)}
              </Form.Item>
              <Form.Item label="子网编码">
                {getFieldDecorator("ip", {})(<Input />)}
              </Form.Item>
              <Form.Item label="默认网关">
                {getFieldDecorator("ip", {})(<Input />)}
              </Form.Item>
              <Form.Item label="DNS1">
                {getFieldDecorator("ip", {})(<Input />)}
              </Form.Item>
              <Form.Item label="DNS2">
                {getFieldDecorator("ip", {})(<Input />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("userUnderIP", {})(<Radio>网络测试</Radio>)}
              </Form.Item>
              <Form.Item label=" ">
                <div className="optwrap">
                  <Button className="submit">确认</Button>
                  <Button className="cancle">取消</Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Form.create({})(NetworkSettings);
