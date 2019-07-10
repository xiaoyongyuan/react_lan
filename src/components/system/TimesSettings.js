import React, { Component } from "react";
import { Row, Col, Form, Radio, Button, Input, Select } from "antd";
import "../../style/jhy/less/timeset.less";
class TimesSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getTimeType: ""
    };
  }
  handleGetTime = e => {
    this.setState({
      getTimeType: e.target.value
    });
  };
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
          <Col span={12}>
            <Form {...formItemLayout} colon={false}>
              <Form.Item>
                <Row>
                  <Col span={6}>
                    {getFieldDecorator("autoGettime", {
                      initialValue: "auto"
                    })(
                      <Radio.Group
                        value={this.state.getTimeType}
                        onChange={e => this.handleGetTime(e)}
                      >
                        <Radio value="auto" className="radios">
                          自动时间设置
                        </Radio>
                        <Radio value="hand" className="radios">
                          手动时间配置
                        </Radio>
                      </Radio.Group>
                    )}
                  </Col>
                  <Col span={10}>
                    <span>请选择时区</span>
                    {/* <Select>

                    </Select> */}
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label="日期">
                {getFieldDecorator("date", {})(<Input />)}
              </Form.Item>
              <Form.Item label="时间">
                {getFieldDecorator("time", {})(<Input />)}
              </Form.Item>
              <Form.Item label=" " style={{ marginTop: "20px" }}>
                <div className="optwrap">
                  <Button type="primary" className="submit">
                    确认
                  </Button>
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
export default Form.create({})(TimesSettings);
