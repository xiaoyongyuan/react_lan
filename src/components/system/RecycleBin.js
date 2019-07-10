import React, { Component } from 'react';
import "../../style/ztt/css/recyclebin.less";
import {Row,Col} from "antd";
import alarmBg from "../../style/ztt/imgs/alarmBg.png";
import axios from "../../axios/index";
import nodata from "../../style/imgs/nodata.png";
class RecycleBin extends Component{
    constructor(props){
        super(props);
        this.state= {
            recycList: []
        };
    }
    componentDidMount() {
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/system/recycleEquList",
            data:{}
        }).then((res)=>{
            if(res.success){
                this.setState({
                    recycList:[1,3]
                })
            }
        })
    }

    render() {
        return (
            <div className="recycleBin">
                <div className="rec-title">回收站内设备配置7天内会清除</div>
                <div className="gutter-example">
                    <Row gutter={16}>
                        {
                            this.state.recycList.length>0?[this.state.recycList.map(()=>(
                                <Col xxl={4} xl={6} className="gutter-row">
                                    <div className="gutter-box">
                                        <img src={alarmBg} alt=""/>
                                        <div className="recycleBg">
                                            <span className="recycleCircle"/>
                                            <span className="recycleFont">新机房</span>
                                        </div>
                                    </div>
                                    <div className="recycleBinBtn">
                                        <span>恢复</span>
                                        <span>7天后清除</span>
                                    </div>
                                </Col>
                            ))]:[<div className="nodata"><img src={nodata} alt="" /></div>]
                        }
                    </Row>
                </div>
            </div>
        );
    }
}
export default RecycleBin;