import React, { Component } from 'react';
import defenceImg from "../../style/ztt/imgs/defenceImg.png";
import policeImg from "../../style/ztt/imgs/policeImg.png";
import "./homeModel.less";
import axios from "../../axios/index";
import {Button, Icon, message} from "antd";
class HomePageModel extends Component{
    constructor(props){
        super(props);
        this.state={
            homeDatail:[]
        };
    }
    componentDidMount() {
        this.getOne();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible){
            this.getOne();
        }
    }
    getOne=()=>{
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/index/alarmvideolist",
            data:{
                acode:this.props.listCode
            }
        }).then((res)=>{
            if(res.success){
               /* res.data[0].fieldresult.map((v)=>{
                    this.setState({
                        tagType:v.tag
                    });
                });*/
                this.setState({
                    homeDatail:res.data,
                    field:res.data[0].field,
                    fieldresult:res.data[0].fieldresult,
                    pic_width:res.data[0].pic_width,
                    pic_height:res.data[0].pic_height,
                    policeStatus:res.data[0].status,
                    policeCode:res.data[0].code,
                },()=>{
                    this.draw();
                })
            }
        })
    };
    //画围界
    draw=()=>{
        let ele = document.getElementById("homeCanvas");
        let area = ele.getContext("2d");
        area.clearRect(0,0,400,280);//清除之前的绘图
        area.lineWidth=1;
        const datafield=this.state.field;
        if(this.state.field && datafield.length){
            const xi=400/this.state.pic_width, yi=280/this.state.pic_height;
            let areafield = ele.getContext("2d");
            area.lineWidth=1;
            areafield.strokeStyle='#f00';
            datafield.map((el,i)=>{
                areafield.beginPath();
                areafield.moveTo(parseInt(datafield[i][0][0]*xi),parseInt(datafield[i][0][1]*yi));
                areafield.lineTo(parseInt(datafield[i][1][0]*xi),parseInt(datafield[i][1][1]*yi));
                areafield.lineTo(parseInt(datafield[i][2][0]*xi),parseInt(datafield[i][2][1]*yi));
                areafield.lineTo(parseInt(datafield[i][3][0]*xi),parseInt(datafield[i][3][1]*yi));
                areafield.lineTo(parseInt(datafield[i][0][0]*xi),parseInt(datafield[i][0][1]*yi));
                areafield.stroke();
                areafield.closePath();
                return '';
            })
        }
        const objs=this.state.fieldresult;
        if(this.state.fieldresult && objs.length){
            //计算缩放比例
            const x=400/this.state.pic_width, y=280/this.state.pic_height;
            objs.map((el,i)=>{
                area.strokeStyle='#ff0';
                area.beginPath();
                area.rect(parseInt(el.x*x),parseInt(el.y*y),parseInt(el.w*x),parseInt(el.h*y));
                area.stroke();
                area.closePath();
                return '';
            })
        }
    };
    //修改报警状态
    hanlePoliceStatus=(status)=>{
        if(this.state.policeCode){
            axios.ajax({
                method:"get",
                url:window.g.loginURL+"/api/alarm/setalastatus",
                data:{
                    acode:this.state.policeCode,
                    status:status
                }
            }).then((res)=>{
                if(res.success){
                    message.info(res.msg);
                }
            })
        }
    };
    render() {
        return(
                this.state.homeDatail.map((v,i)=>(
                    <div className="homePageModel">
                        <div className="homePageModelLeft">
                            <div className="homeageImg">
                                <div className="homeImg">
                                    <canvas id="homeCanvas" width="400px" height="280px" style={{backgroundImage:'url('+v.picpath+')',backgroundSize:"100% 100%"}} alt=""/>
                                </div>
                                <div className="homeImg">
                                    <video controls src={v.videopath?v.videopath:defenceImg} alt=""/>
                                </div>
                            </div>
                            <p className="nextHome">
                                <span className="nextUp">上一个 </span>
                                <span className="arrLeft"><Icon type="arrow-left" className="cicrle-icon" /></span>
                                <span className="arrRight"><Icon type="arrow-right" className="cicrle-icon" /></span>
                                <span className="nextUp">下一个</span>
                            </p>
                        </div>
                        <div className="homePageModelRight">
                            <div className="deviceContext">
                            <div className="nameDevice"><span className="equName">设备名称</span><span className="equTimes">{v.name}</span></div>
                            <div className="nameDevice typePolice"><span>报警类型</span><span className="manAlarm">{this.state.tagType===0?"人员报警":"车辆报警"}</span><span>{this.state.tagType===1?"车辆报警":"人员报警"}</span></div>
                            <div className="nameDevice"><span className="equName">报警时间</span><span className="equTimes">{v.atime}</span></div>
                            <Button>防区显示<span className="sectorBtn"><Icon className="cicrle-icon" type="check" /></span></Button>
                            <Button>目标显示<span className="sectorBtn"><Icon className="cicrle-icon" type="check" /></span></Button>
                            </div>
                            <div className="alarmImg">
                                <div className="alarBg">
                                    <img className="policeImg" src={policeImg} />
                                    <span>报警处理</span>
                                </div>
                                <div className="policeBtn">
                                    <Button type="primary" onClick={()=>this.hanlePoliceStatus("1")}>警情</Button>
                                    <Button type="primary" onClick={()=>this.hanlePoliceStatus("3")}>虚警</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
        );
    }
}
export default HomePageModel;