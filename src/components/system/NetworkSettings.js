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
            <Button type="primary">网卡一配置</Button>
          </Row>
          <Col span={8}>
            <Form {...formItemLayout}>
              <Form.Item label="自动获取IP地址">
                {getFieldDecorator("autoGetIp", {})(<Radio />)}
              </Form.Item>
              <Form.Item label="使用下面的IP地址">
                {getFieldDecorator("userUnderIP", {})(<Radio />)}
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
              <Form.Item label="网络测试">
                {getFieldDecorator("userUnderIP", {})(<Radio />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary">确认</Button>
                <Button type="default">取消</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Row>
            <Button type="primary">网卡二配置</Button>
          </Row>
          <Col span={8}>
            <Form {...formItemLayout}>
              <Form.Item label="自动获取IP地址">
                {getFieldDecorator("autoGetIp", {})(<Radio />)}
              </Form.Item>
              <Form.Item label="使用下面的IP地址">
                {getFieldDecorator("userUnderIP", {})(<Radio />)}
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
              <Form.Item label="网络测试">
                {getFieldDecorator("userUnderIP", {})(<Radio />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary">确认</Button>
                <Button type="default">取消</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Form.create({})(NetworkSettings);
