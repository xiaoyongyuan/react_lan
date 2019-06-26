import React, { Component } from 'react';
import { Row, Col, Select,DatePicker,Button,Icon } from 'antd';
import "./ploceinfomation.less";
import test from "../../style/imgs/testl.png";
import test2 from "../../style/imgs/test2.png";
import bottom from "../../style/imgs/bottom.png";
import alarmcl from "../../style/imgs/alarmcl.png";
const { Option } = Select;
const { RangePicker } = DatePicker;
class PoliceInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    handleChange = (value) =>{
        console.log(`selected ${value}`);
    };
    onChange = (value,dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };
    onOk = (value) => {
        console.log('onOk: ', value);
    };
    render() {
        return(
            <div className="ploceinfomation">
                <Row className="ploceinfomation-query">
                    <Col span={5}>
                        <span className="select-camera">选择摄像头</span>
                        <Select className="select-form" defaultValue="lucy" onChange={this.handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Col>
                    <Col span={7}>
                        <Row className="falsealarm">
                            <Col span={8} className="alert-col">
                                <div className="alert">
                                    <div className="zdupdate-word">警情</div>
                                    <div className="cicrle">
                                        <Icon className="cicrle-icon" type="check" />
                                    </div>
                                </div>
                            </Col>
                            <Col className="alert-col" span={8}>
                                <div className="falsealert">
                                    <div className="zdupdate-word">警情</div>
                                    <div className="cicrle">
                                        <Icon className="cicrle-icon" type="check" />
                                    </div>
                                </div>
                            </Col>
                            <Col className="alert-col" span={8}>
                                <div className="xualert">
                                    <div className="zdupdate-word">警情</div>
                                    <div className="cicrle">
                                        <Icon className="cicrle-icon" type="check" />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <span className="select-time">选择时间</span>
                        <RangePicker
                            className="select-time-form"
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            placeholder={['开始时间', '结束时间']}
                            onChange={this.onChange}
                            onOk={this.onOk}
                        />
                        <Button className="query-btn" type="primary">搜索</Button>
                    </Col>
                </Row>
                <Row className="ploceinfomation-main" >
                    <div  className="main-left">
                        <Row type="flex" justify="space-around">
                            <Col className="main-left-L" span={12}>
                                <div className="img-up-fu">
                                    <div className="img-up-fu-word">
                                        <div className="circle">
                                        </div>
                                        <span className="img-up-fu-word-span">新风机房2号门</span>
                                    </div>
                                </div>
                            </Col>
                            <Col className="main-left-R" span={12}>
                                <img src={test2} style={{ width:'100%',height:'100%' }}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="updown">
                                <span>上一个</span>
                                    <div className="updown-left"><Icon type="arrow-left" style={{ color: '#fff' }} /></div>
                                    <div className="updown-left"><Icon type="arrow-right" style={{ color: '#fff' }} /></div>
                                <span>下一个</span>
                            </Col>
                        </Row>
                    </div>
                    <div className="main-right">
                        <div className="up">
                            <div style={{ height:'20px' }}>
                            </div>
                            <Row className="equipName">
                                <Col className="equipName-left" span={8}>
                                    设备名称
                                </Col>
                                <Col className="equipName-right" span={16}>
                                    <span className="equipName-right-word">新风机房2号门</span>
                                </Col>
                            </Row>
                            <Row className="equipName">
                                <Col className="equipName-left" span={8}>
                                    报警类型
                                </Col>
                                <Col className="equipName-left" span={8}>
                                    <span className="equipName-right-word">人员报警</span>
                                </Col>
                                <Col className="equipName-right-caralarm" span={8}>
                                    <span className="equipName-right-word">车辆报警</span>
                                </Col>
                            </Row>
                            <Row className="equipName">
                                <Col className="equipName-left" span={8}>
                                    报警时间
                                </Col>
                                <Col className="equipName-right" span={16}>
                                    <span className="equipName-right-word">2019-12-12 12:12:23</span>
                                </Col>
                            </Row>
                            <Row className="showTaget">
                                <Col span={8}>
                                    <div className="showfq">
                                        <div className="zdupdate-word">自动更新</div>
                                        <div className="cicrle">
                                            <Icon className="cicrle-icon" type="check" />
                                        </div>
                                    </div>
                                    <div className="showfq">
                                        <div className="zdupdate-word">自动更新</div>
                                        <div className="cicrle">
                                            <Icon className="cicrle-icon" type="check" />
                                        </div>
                                    </div>
                                </Col>
                                <Col span={16} className="addqc">
                                    <div className="addqcdiv">
                                        <span>添加去重</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="down">
                            <Row>
                                <Col span={6}>
                                    <div className="alarmcl">
                                        <div className="alarmcl-img">
                                            <img src={alarmcl} style={{ width:'50px',height:'40px' }}/>
                                        </div>
                                        <div className="alarmcl-word">
                                            <span>报警处理</span>
                                        </div>

                                    </div>
                                </Col>
                                <Col span={18}>
                                    <div className="alarmq">
                                        <span>警情</span>
                                    </div>
                                    <div className="alarmx">
                                        <span>虚警</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Row>
                <Row className="ploceinfomation-update">
                    <Col span={12}>
                        <span className="updata-word">累计更新数量</span>
                        <div className="updata-Num">
                            50
                        </div>
                    </Col>
                    <Col span={12} className="zdupdate-col">
                        <div className="zdupdate">
                            <div className="zdupdate-word">自动更新</div>
                            <div className="cicrle">
                                <Icon className="cicrle-icon" type="check" />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="ploceinfomation-bottom">
                    <Col>
                        <div className="ploceinfomation-bottom-item">
                            <div className="ploceinfomation-bottom-item-inner">
                                <div className="ploceinfomation-bottom-item-img">
                                    <div className="up">
                                        <div className="mark">
                                            <div className="cicler">
                                            </div>
                                            <span className="word">未处理</span>
                                        </div>
                                        <div className="time">
                                            <span className="tiem-word">2019-10-10 12:12:12</span>
                                        </div>
                                    </div>
                                    <div className="down">
                                        <div className="img-up-fu-word">
                                            <div className="circle">
                                            </div>
                                            <span className="img-up-fu-word-span">新风机房2号门</span>
                                            <Icon className="icondian" type="ellipsis" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ploceinfomation-bottom-item">
                            <div className="ploceinfomation-bottom-item-inner">
                                <div className="ploceinfomation-bottom-item-img">
                                    <div className="up">
                                        <div className="mark">
                                            <div className="cicler">
                                            </div>
                                            <span className="word">未处理</span>
                                        </div>
                                        <div className="time">
                                            <span className="tiem-word">2019-10-10 12:12:12</span>
                                        </div>
                                    </div>
                                    <div className="down">
                                        <div className="img-up-fu-word">
                                            <div className="circle">
                                            </div>
                                            <span className="img-up-fu-word-span">新风机房2号门</span>
                                            <Icon className="icondian" type="ellipsis" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ploceinfomation-bottom-item">
                            <div className="ploceinfomation-bottom-item-inner">
                                <div className="ploceinfomation-bottom-item-img">
                                    <div className="up">
                                        <div className="mark">
                                            <div className="cicler">
                                            </div>
                                            <span className="word">未处理</span>
                                        </div>
                                        <div className="time">
                                            <span className="tiem-word">2019-10-10 12:12:12</span>
                                        </div>
                                    </div>
                                    <div className="down">
                                        <div className="img-up-fu-word">
                                            <div className="circle">
                                            </div>
                                            <span className="img-up-fu-word-span">新风机房2号门</span>
                                            <Icon className="icondian" type="ellipsis" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ploceinfomation-bottom-item">
                            <div className="ploceinfomation-bottom-item-inner">
                                <div className="ploceinfomation-bottom-item-img">
                                    <div className="up">
                                        <div className="mark">
                                            <div className="cicler">
                                            </div>
                                            <span className="word">未处理</span>
                                        </div>
                                        <div className="time">
                                            <span className="tiem-word">2019-10-10 12:12:12</span>
                                        </div>
                                    </div>
                                    <div className="down">
                                        <div className="img-up-fu-word">
                                            <div className="circle">
                                            </div>
                                            <span className="img-up-fu-word-span">新风机房2号门</span>
                                            <Icon className="icondian" type="ellipsis" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ploceinfomation-bottom-item">
                            <div className="ploceinfomation-bottom-item-inner">
                                <div className="ploceinfomation-bottom-item-img">
                                    <div className="up">
                                        <div className="mark">
                                            <div className="cicler">
                                            </div>
                                            <span className="word">未处理</span>
                                        </div>
                                        <div className="time">
                                            <span className="tiem-word">2019-10-10 12:12:12</span>
                                        </div>
                                    </div>
                                    <div className="down">
                                        <div className="img-up-fu-word">
                                            <div className="circle">
                                            </div>
                                            <span className="img-up-fu-word-span">新风机房2号门</span>
                                            <Icon className="icondian" type="ellipsis" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PoliceInformation;
