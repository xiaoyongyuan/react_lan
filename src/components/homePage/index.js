import React, { Component } from 'react';
import "./index.less";
import {Modal,Row,Col} from "antd";
import alarmBg from "../../style/ztt/imgs/alarmBg.png";
import defenceImg from "../../style/ztt/imgs/defenceImg.png";
import playBtn from "../../style/ztt/imgs/playBtn.png";
import HomePageModel from "./HomePageModel";
import axios from "../../axios/index";
import nodata from "../../style/imgs/nodata.png";
import 'swiper/dist/css/swiper.min.css';
import Swiper from 'swiper/dist/js/swiper.js';
import EchartsLegend from "./EchartsLegend";
class Index extends Component {
    constructor(props) {
      super(props);
      this.state = {
          fortification:"已布防",
          visible:false,
          policeList:[],
      };
    }
    params={};
    componentDidMount() {
        this.hanleBgColor1();
        this.hanleBgColor2();
        this.getList();
        this.equipmentCount();
        this.policeCount();
        new Swiper ('.swiper-container', {
            loop:true,
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween:10,
            /*virtual: {
                slides:this.state.policeList,
            }*/
        });
    }
    //设备数量
    equipmentCount=()=>{
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/index/equipmenttotal",
            data:{}
        }).then((res)=>{
            if(res.success){
                this.setState({
                    cameraTotals:res.data.cameraTotals,
                    onlineCameras:res.data.onlineCameras,
                    downCameras:res.data.downCameras
                })
            }
        })
    };
    policeCount=()=>{
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/index/alarmtotal",
            data:{}
        }).then((res)=>{
            if(res.success){
                this.setState({
                    totalCount:res.data.totalCount,
                    hasDealCount:res.data.hasDealCount,
                    unDealCount:res.data.unDealCount
                })
            }
        })
    };
    //报警信息
    getList=()=>{
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/index/alarmvideolist",
            data:{}
        }).then((res)=>{
            this.setState({
                policeList:res.data.slice(0,20)
            })
        })
    };
    hanleDefence=(params)=>{
        this.setState({
            fortification:params
        });
    };
    hanleBgColor1=(params)=>{
        if(this.state.fortification===params){
            return "defended-name defendedBorder1Color";
        }else{
            return "defended-name defendedBorder2Color";
        }
    };
    hanleBgColor2=(params)=>{
        if(this.state.fortification===params){
            return "defendedBorder1 defendedBorder1bg defendedBorder1Color";
        }else{
            return "defendedBorder2 defendedBorder2bg defendedBorder2Color";
        }
    };
    hanledefendedBtn=()=>{
        if(this.state.fortification==="已布防"){
            return "defendedBtn";
        }else{
            return "defendedBtn1";
        }
    };
    hanleWithdrawal=(listCode)=>{
        this.setState({
            visible:true,
            listCode:listCode
        });
    };
    handleOk=()=>{
        this.setState({
            visible:true
        })
    };
    handleCancel=()=>{
        this.setState({
            visible:false
        });
        this.getList();
    };
    //最后一次报警情况
    hanlelastAlarm=()=>{
      if(this.state.fortification==="已布防"){
          return(
              <div className="alarmImg">
                  <div className="alarmVideo"><img src={defenceImg} alt=""/>
                      <div className="alarmVideoBottom">
                          <span className="alarmVideoCircle"/><span className="alarmVideoName">新机房2号门</span>
                      </div>
                  </div>
                  <div className="alarmVideo"><img src={defenceImg} alt=""/>
                      <div className="alarmVideoBottom">
                          <span className="alarmVideoCircle"/><span className="alarmVideoName">新机房2号门</span>
                      </div>
                      <img className="alarmVideoBtn" src={playBtn}/>
                  </div>
              </div>
          )
      }else{
         return(
             <div className="alarmImg">
                 <div className="alarmVideo"><img src={alarmBg} alt=""/>
                     <div className="alarmVideoBottom">
                         <span className="alarmVideoCircle"/><span className="alarmVideoName">新机房2号门</span>
                     </div>
                 </div>
                 <div className="alarmVideo"><img src={alarmBg} alt=""/>
                     <div className="alarmVideoBottom">
                         <span className="alarmVideoCircle"/><span className="alarmVideoName">新机房2号门</span>
                     </div>
                     <img className="alarmVideoBtn" src={playBtn}/>
                 </div>
             </div>
         )
      }
    };
    render() {
        return(
            <div className="homePage">
                <div className="equNum">
                    <div className="equ equ-right">
                        <span className="equImg1" />
                        <div className="equContext">
                            <span className="equipName">设备总数</span>
                            <span className="equipTotal"><span className="equBer">{this.state.cameraTotals?this.state.cameraTotals:0}</span>/部</span>
                        </div>
                    </div>
                    <div className="equ equBorder">
                        <span className="equImg2" />
                        <div className="equContext">
                            <span className="equipName">在线设备</span>
                            <span className="equipTotal"><span className="equBer">{this.state.onlineCameras?this.state.onlineCameras:0}</span>/部</span>
                        </div>
                    </div>
                    <div className="equ equBorder">
                        <span className="equImg3" />
                        <div className="equContext">
                            <span className="equipName">离线设备</span>
                            <span className="equipTotal"><span className="equBer">{this.state.downCameras?this.state.downCameras:0}</span>/部</span>
                        </div>
                    </div>
                    <div className="equ equBorder">
                        <span className="equImg4" />
                        <div className="equContext">
                            <span className="equipName">已处理报警</span>
                            <span className="equipTotal-Handle"><span className="equBer">{this.state.hasDealCount?this.state.hasDealCount:0}</span>/条</span>
                        </div>
                    </div>
                    <div className="equ equBorder">
                        <span className="equImg5" />
                        <div className="equContext">
                            <span className="equipName">未处理报警</span>
                            <span className="equipTotal-UHandle"><span className="equBer">{this.state.unDealCount?this.state.unDealCount:0}</span>/条</span>
                        </div>
                    </div>
                    <div className="equ1 equ-left">
                        <span className="equImg6" />
                        <div className="equContext">
                            <span className="equipName">今天报警总数</span>
                            <span className="equipTotal-today"><span className="equBer">{this.state.totalCount?this.state.totalCount:0}</span>/条</span>
                        </div>
                    </div>
                </div>
                <div className="computerRoom">
                    <div className="computerRoom-context">
                        <div className="computerRoom-title">傲科云科技服务器机房</div>
                        <div className="computerRoomStatus">
                            <div className="RoomStatusLeft">
                                <p className="roomAlarm"><span className="statusImg1" /><span className="status1">有报警状态</span></p>
                                <p className="roomAlarm"><span className="statusImg2" /><span className="status2">无报警状态</span></p>
                                <p className="roomAlarm"><span className="statusImg3" /><span className="status3">离线</span></p>
                            </div>
                            <div className="computer"><EchartsLegend /></div>
                        </div>

                    </div>
                    <div className="computerRoom-camera">
                        <div className="video-camera">
                            <span className="videoImg"/><span className="videoName">机房智能摄像机</span>
                        </div>
                        <div className="eqiIp">
                            <div className="eqiIp-context">
                                <span>设备IP</span>
                                <span>192.168.0.23</span>
                            </div>
                            <div className="eqiIp-UHanld">
                                <span>此设备未处理报警数</span>
                                <span>45</span>
                            </div>
                        </div>
                        <div className="fortification">
                            <div className="fortification-title"><span className="videoImg" /><span className="videoName">设防情况</span></div>
                            <div className="defended">
                                <div className="defended-title" onClick={()=>this.hanleDefence("已布防")} >
                                    <span className={this.hanleBgColor1("已布防")}>已布防</span>
                                    <span className={this.hanleBgColor2("已布防")}/>
                                </div>
                                <div className="defended-title" onClick={()=>this.hanleDefence("已撤防")} >
                                    <span className={this.hanleBgColor1("已撤防")}>已撤防</span>
                                    <span className={this.hanleBgColor2("已撤防")} />
                                </div>
                            </div>
                            <button className={this.hanledefendedBtn()}>{this.state.fortification==="已布防"?"一键撤防":"一键布防"}</button>
                        </div>
                        <div className="lastAlarm">
                            <div className="alarm-title"><span className="videoImg" /><span className="videoName">最新一次报警情况</span></div>
                            {this.hanlelastAlarm()}
                        </div>
                    </div>
                </div>
                <div className="alarminfor">
                    <a href="#/main/policeInformation"><div className="alarminfornikName"><span className="alarminfornikName-title">更多报警信息</span><span className="alarminfornikNameBg"/></div></a>
                    <div className="gutter-example">
                        <Row gutter={16}>
                            <div className="swiper-container">
                                <div className="swiper-wrapper">
                                    {
                                        this.state.policeList.map((v,i)=>(
                                            <Col className="gutter-row" span={4} key={i}>
                                                <div className="gutter-box" onClick={()=>this.hanleWithdrawal(v.code)}>
                                                    <img src={v.picpath?v.picpath:defenceImg} alt="" className="defence"/>
                                                    <div className="alarminforBg">
                                                        <span className="alarminforCirle"/>
                                                        <span className="alarminforFont">{v.name}</span>
                                                        <span className="alarminforVideo"/>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </div>
                            </div>
                        </Row>
                    </div>
                </div>
                <div className="nodata"><img src={nodata} alt="" style={{width:"80px",height:"78px",display:this.state.policeList.length>0?"none":"block"}} /></div>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    centered
                    onCancel={this.handleCancel}
                    width={1200}
                    footer={null}
                >
                    <HomePageModel visible={this.state.visible} listCode={this.state.listCode} />
                </Modal>
            </div>
        );
    }
}

export default Index;
