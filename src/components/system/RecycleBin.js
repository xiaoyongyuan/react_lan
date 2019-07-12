import React, { Component } from 'react';
import "../../style/ztt/css/recyclebin.less";
import {Row,Col,message,Modal} from "antd";
import alarmBg from "../../style/ztt/imgs/alarmBg.png";
import axios from "../../axios/index";
import nodata from "../../style/imgs/nodata.png";
import moment from "moment";
const confirm = Modal.confirm;
class RecycleBin extends Component{
    constructor(props){
        super(props);
        this.state= {
            recycList: []
        };
    }
    componentDidMount() {
        this.getList();
    }
    getList=()=>{
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/camera/getlist",
            data:{
                ifdel:1
            }
        }).then((res)=>{
            if(res.success){
                this.setState({
                    recycList:res.data
                })
            }
        })
    };
    //恢复
    hanleRecovery=(recoveryCode)=>{
        confirm({
            content: '确认恢复该设备吗？',
            onOk() {
                axios.ajax({
                    method:"put",
                    url:window.g.loginURL+"/api/camera/update",
                    data:{
                        ifdel:1,
                        code:recoveryCode
                    }
                }).then((res)=>{
                    if(res.success){
                        message.info(res.msg)
                    }
                })
            }
        });
    };
    hanleEliminate=(time)=>{
        let beforeTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
        let mydate = moment(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
        let days=mydate.diff(beforeTime, 'day');
        return 7-days;
    };
    render() {
        return (
            <div className="recycleBin">
                <div className="rec-title">回收站内设备配置7天内会清除</div>
                <div className="gutter-example">
                    <Row gutter={16}>
                        {
                            this.state.recycList.length>0?[this.state.recycList.map((v,i)=>(
                                <Col xxl={4} xl={6} className="gutter-row" key={i}>
                                    <div className="gutter-box">
                                        <img src={v.basemap?v.basemap:alarmBg} alt=""/>
                                        <div className="recycleBg">
                                            <span className="recycleCircle"/>
                                            <span className="recycleFont">{v.name}</span>
                                        </div>
                                    </div>
                                    <div className="recycleBinBtn">
                                        <span onClick={()=>this.hanleRecovery(v.code)}>恢复</span>
                                        <span>{this.hanleEliminate(v.deltime)}天后清除</span>
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