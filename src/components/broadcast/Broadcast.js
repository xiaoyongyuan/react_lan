import React, { Component } from 'react';
import {Row,Col,Modal} from "antd";
import defenceImg from "../../style/ztt/imgs/defenceImg.png";
import nodata from "../../style/imgs/nodata.png";
import "./broadcast.less";
import axios from "../../axios/index";
import playBtn from "../../style/ztt/imgs/playBtn.png";
import Live from "../live/Live";
class Broadcast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveModel: false,
            liveList: []
        };
    }
    componentDidMount() {
      this.getList();
      this.setState({
          nowTime:Date.parse(new Date())
      })
    }
    getList=()=>{
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/camera/getlistforvideo",
            data:{}
        }).then((res)=>{
            if(res.success){
                this.setState({
                    liveList:res.data
                });
            }
        })
    };
    hanleLive=(videostreaming)=>{
        this.setState({
            liveModel:true,
            videostreaming
        });
    };
    hanleLiveCancel=()=>{
        this.setState({
            liveModel:false
        })
    };
    componentWillUnmount() {
         if (this.player) {
             this.player.dispose();
         }
    }

    render() {
        return(
            <div className="broadcast">
                <Row className="title-broad">
                    <Col span={14}>视频直播</Col>
                    <Col span={10} className="condition">
                       {/* <Form layout="inline">
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
                                <Button type="primary" htmlType="submit" className="sureBtn">确定</Button>
                                <Button type="primary" className="resetBtn">重置</Button>
                                <Button type="primary" className="stopBtn">全部停止</Button>
                            </Form.Item>
                        </Form>*/}
                    </Col>
                </Row>
                <Row gutter={16} className="broContext">
                {
                    this.state.liveList.length>0?
                        [this.state.liveList.map((v,i)=>(
                        <Col xxl={4} xl={8} className="gutter-row" key={i}>
                            <div className="gutter-box borderBot">
                                <img className="videoImg" src={v.basemap?v.basemap+"?t="+this.state.nowTime:defenceImg} alt="" />
                                <img className="videoBtn" src={playBtn} alt="" onClick={()=>this.hanleLive(v.videostreaming)} />
                                <div className="broadcastBott">
                                    <span className="broCircle"/><span className="broFont">{v.name}</span>
                                </div>
                            </div>
                        </Col>
                    ))]:[<div className="nodata"><img src={nodata} alt="" /></div>]
                }
                </Row>
                <Modal
                    title="直播"
                    visible={this.state.liveModel}
                    width={900}
                    footer={null}
                    onCancel={this.hanleLiveCancel}
                    destroyOnClose={true}
                    centered={true}
                    maskClosable={false}
                >
                    <Live liveModel={this.state.liveModel} videostreaming={this.state.videostreaming} />
                </Modal>
            </div>
        );
    }
}

export default Broadcast;
