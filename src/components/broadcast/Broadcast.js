import React, { Component } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import {Row,Col,Form,Input,Button,Select} from "antd";
import defenceImg from "../../style/ztt/imgs/defenceImg.png";
import "./broadcast.css";
const { Option } = Select;
class Broadcast extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
      /*  this.player = videojs('myvideo', {
            preload: 'auto',// 预加载
            bigPlayButton: {},// 大按钮
            controls: true,// 是否开启控制栏
            width: 900,// 播放器宽度
            height: 600,// 播放器高度
            playbackRates: [1, 1.5, 2],
            muted: true, //是否循环播放
            loop : true, //是否静音
            autoplay:true, //是否自动播放
        }, function onPlayerReady() {
                this.src({
                    src: 'rtmp://192.168.1.178/live/app7',
                    type:'rtmp/flv'
                })
        });*/
    }

    render() {
        const { getFieldDecorator} = this.props.form;
        return(
            <div className="broadcast">
               {/* <div data-vjs-player>
                    <video ref={ node => this.videoNode = node } className="video-js" id="myvideo"></video>
                </div>*/}
                <Row className="title-broad">
                    <Col span={14}>直播功能</Col>
                    <Col span={10} className="condition">
                        <Form layout="inline">
                            <Form.Item label="选择">
                                {getFieldDecorator('username', {
                                    rules: [{ required: false, message: 'Please input your username!' }],
                                    initialValue:"0"
                                })(
                                    <Select style={{ width: 120 }}>
                                        <Option value="0">全部</Option>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" >确定</Button>
                                <Button type="primary" >重置</Button>
                                <Button type="primary">全部停止</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <Row gutter={16} className="broContext">
                    <Col xxl={4} xl={8} className="gutter-row">
                        <div className="gutter-box borderBot">
                            <img src={defenceImg} alt=""/>
                            <div className="broadcastBott">
                                <span className="broCircle"/><span className="broFont">新机房1</span>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={4} xl={8} className="gutter-row"><div className="gutter-box"><img src={defenceImg} alt=""/></div></Col>
                    <Col xxl={4} xl={8} className="gutter-row"><div className="gutter-box"><img src={defenceImg} alt=""/></div></Col>
                    <Col xxl={4} xl={8} className="gutter-row"><div className="gutter-box"><img src={defenceImg} alt=""/></div></Col>
                    <Col xxl={4} xl={8} className="gutter-row"><div className="gutter-box"><img src={defenceImg} alt=""/></div></Col>
                    <Col xxl={4} xl={8} className="gutter-row"><div className="gutter-box"><img src={defenceImg} alt=""/></div></Col>
                </Row>
            </div>
        );
    }
}

export default Broadcast=Form.create({})(Broadcast);
