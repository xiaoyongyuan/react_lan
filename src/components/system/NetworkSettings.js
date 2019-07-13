import React, { Component } from "react";
import { Row, Col, Form, Radio, Button, Input } from "antd";
import "../../style/jhy/less/netset.less";

const NetOneForm = Form.create({})(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isDisable: false
      };
    }
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
        <Form {...formItemLayout} colon={false} onSubmit={this.props.onSub}>
          <Form.Item>
            {getFieldDecorator("autoGetIp", {})(
              <Radio
                value="auto"
                checked={this.state.isDisable}
                onClick={() => this.setState({ isDisable: true })}
              >
                自动获取IP地址
              </Radio>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("useUnderIP", {})(
              <Radio
                value="hand"
                checked={!this.state.isDisable}
                onClick={() => this.setState({ isDisable: false })}
              >
                使用下面的IP地址
              </Radio>
            )}
          </Form.Item>
          <Form.Item label="IP号">
            {getFieldDecorator("ip", {})(
              <Input disabled={this.state.isDisable} />
            )}
          </Form.Item>
          <Form.Item label="子网编码">
            {getFieldDecorator("ip", {})(
              <Input disabled={this.state.isDisable} />
            )}
          </Form.Item>
          <Form.Item label="默认网关">
            {getFieldDecorator("ip", {})(
              <Input disabled={this.state.isDisable} />
            )}
          </Form.Item>
          <Form.Item label="DNS1">
            {getFieldDecorator("ip", {})(
              <Input disabled={this.state.isDisable} />
            )}
          </Form.Item>
          <Form.Item label="DNS2">
            {getFieldDecorator("ip", {})(
              <Input disabled={this.state.isDisable} />
            )}
          </Form.Item>
          {/* <Form.Item>
                {getFieldDecorator("userUnderIP", {})(<Radio>网络测试</Radio>)}
              </Form.Item> */}
          <Form.Item label=" ">
            <div className="optwrap">
              <Button type="primary" className="submit" htmlType="submit">
                确认
              </Button>
              <Button className="cancle" onClick={this.props.onReset}>
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      );
    }
  }
);
const NetTwoForm = Form.create({})(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isDisableTwo: false
      };
    }
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
        <Form {...formItemLayout} colon={false} onSubmit={this.props.onSub}>
          <Form.Item>
            {getFieldDecorator("autoGetIp", {})(
              <Radio
                value="auto"
                checked={this.state.isDisableTwo}
                onClick={() => this.setState({ isDisableTwo: true })}
              >
                自动获取IP地址
              </Radio>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("useUnderIP", {})(
              <Radio
                value="hand"
                checked={!this.state.isDisableTwo}
                onClick={() => this.setState({ isDisableTwo: false })}
              >
                使用下面的IP地址
              </Radio>
            )}
          </Form.Item>
          <Form.Item label="IP号">
            {getFieldDecorator("ip", {})(
              <Input disabled={this.state.isDisableTwo} />
            )}
          </Form.Item>
          <Form.Item label="子网编码">
            {getFieldDecorator("ip", {})(
              <Input disabled={this.state.isDisableTwo} />
            )}
          </Form.Item>
          <Form.Item label="默认网关">
            {getFieldDecorator("ip", {})(
              <Input disabled={this.state.isDisableTwo} />
            )}
          </Form.Item>
          <Form.Item label="DNS1">
            {getFieldDecorator("ip", {})(
              <Input disabled={this.state.isDisableTwo} />
            )}
          </Form.Item>
          <Form.Item label="DNS2">
            {getFieldDecorator("ip", {})(
              <Input disabled={this.state.isDisableTwo} />
            )}
          </Form.Item>
          {/* <Form.Item>
                {getFieldDecorator("userUnderIP", {})(<Radio>网络测试</Radio>)}
              </Form.Item> */}
          <Form.Item label=" ">
            <div className="optwrap">
              <Button className="submit" type="primary" htmlType="submit">
                确认
              </Button>
              <Button className="cancle" onClick={this.props.onReset}>
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      );
    }
  }
);

class NetworkSettings extends Component {
  handleSub(type) {
    if (type === "one") {
      const { validateFields } = this.form1.props.form;
      validateFields((err, values) => {});
    } else {
      const { validateFields } = this.form2.props.form;
    }
  }
  handleReset(type) {
    if (type === "one") {
      const { resetFields } = this.form1.props.form;
      resetFields();
    } else {
      const { resetFields } = this.form2.props.form;
      resetFields();
    }
  }
  render() {
    return (
      <div className="netset">
        <Row>
          <Row>
            <span className="netcard">网卡一配置</span>
          </Row>
          <Col span={12}>
            <NetOneForm
              wrappedComponentRef={form => (this.form1 = form)}
              onSub={() => this.handleSub("one")}
              onReset={() => this.handleReset("one")}
            />
          </Col>
        </Row>
        <Row className="cardtwo">
          <Row>
            <span className="netcard">网卡二配置</span>
          </Row>
          <Col span={12}>
            <NetTwoForm
              wrappedComponentRef={form => (this.form2 = form)}
              onSub={() => this.handleSub("two")}
              onReset={() => this.handleReset("two")}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
export default Form.create({})(NetworkSettings);
