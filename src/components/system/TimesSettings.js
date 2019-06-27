import React, { Component } from "react";
import { Row, Col, Form, Radio, Button, Input, TimePicker } from "antd";
import "../../style/jhy/less/timeset.less";
class TimesSettings extends Component {
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
      <div className="timeset">
        <Row>
          <Col span={8}>
            <Form {...formItemLayout}>
              <Form.Item label="自动时间设置">
                {getFieldDecorator("autoGettime", {})(<Radio />)}
              </Form.Item>
              <Form.Item label="选择时间获取源">
                {getFieldDecorator("timeselect", {})(<TimePicker />)}
              </Form.Item>
              <Form.Item label="手动时间配置">
                {getFieldDecorator("handletime", {})(<Radio />)}
              </Form.Item>
              <Form.Item label="日期">
                {getFieldDecorator("date", {})(<Input />)}
              </Form.Item>
              <Form.Item label="时间">
                {getFieldDecorator("time", {})(<Input />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary">确认</Button>
                <Button type="">取消</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Form.create({})(TimesSettings);
