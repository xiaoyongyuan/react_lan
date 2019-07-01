import React, { Component } from 'react';
import { Row, Col, Select,DatePicker,Button,Icon,Form,message } from 'antd';
import "./ploceinfomation.less";
import test2 from "../../style/imgs/test2.png";
import alarmcl from "../../style/imgs/alarmcl.png";
import 'swiper/dist/css/swiper.min.css';
import Swiper from 'swiper/dist/js/swiper.js'
import alarmBg from "../../style/ztt/imgs/defenceImg.png";
import axios from "../../axios/index";
import moment from "moment";
const { Option } = Select;
const { RangePicker } = DatePicker;
class PoliceInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alarm: {},
            malarminfo: [],
            policeList:[],
            equList:[]
        };
    }
    params={

    };
    componentDidMount() {
        new Swiper(".swiper-container", {
            loop: false, //循环
            // autoplay: {
            //     //滑动后继续播放（不写官方默认暂停）
            //     disableOnInteraction: false
            // }, //可选选项，自动滑动
            slidesPerView: 5,
            spaceBetween: 10,
            observer: true,
            observeParents: true,
            observeSlideChildren: true
        });
       this.getList();
       this.hanleEquipment();
       this.hanleQuantity();
       this.handlePoliceList();
    }
    getList=()=>{
        this.params.cid=1;
        this.params.status=0;
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/alarm/alarminfo",
            data:this.params
        }).then((res)=>{
            if(res.success){
                res.data.Malarm.fieldresult.map((v)=>{
                    this.setState({
                        tagType:v.tag
                    });
                });
                this.setState({
                    alarm:res.data.Malarm,
                    alarmImg:res.data.Malarm.picpath,
                    malarminfo:res.data.Malarm.Malarminfo,
                    field:res.data.Malarm.field,
                    fieldresult:res.data.Malarm.fieldresult,
                    policeCode:res.data.Malarm.code,
                    pic_width:res.data.Malarm.pic_width,
                    pic_height:res.data.Malarm.pic_height,
                    policeStatus:res.data.Malarm.status
                },()=>{
                    this.draw();
                })
            }
        })
    };
    //画围界
    draw=()=>{
        let ele = document.getElementById("canvasobj");
        let area = ele.getContext("2d");
        area.clearRect(0,0,300,278);//清除之前的绘图
        area.lineWidth=1;

        const datafield=this.state.field;
        if(this.state.field && datafield.length){
            const xi=300/this.state.pic_width, yi=278/this.state.pic_height;
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
            const x=300/this.state.pic_width, y=278/this.state.pic_height;
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
    //设备
    hanleEquipment=()=>{
        axios.ajax({
            method: "get",
            url:window.g.loginURL+"/api/camera/getlistSelect",
            data:{}
        }).then((res)=>{
            if(res.success){
                this.setState({
                    equList:res.data
                })
            }
        })
    };
    //更新数量
    hanleQuantity=()=>{
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/alarm/updatecount",
            data:{}
        }).then((res)=>{
            if(res.success){
                this.setState({
                    updateQuant:res.data.count
                })
            }
        })
    };
    //报警列表
    handlePoliceList=(datas)=>{
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/alarm/alarmlist",
            data:{datas}
        }).then((res)=>{
            if(res.success){
                this.setState({
                    policeList:res.data
                })
            }
        })
    };
    //报警状态
    hanleStatus=(ststus)=>{
        switch (ststus) {
            case 0:
                return "未处理";
            case 1:
                return "警情";
            case 3:
                return "虚警";
            default:
                return;
        }
    };
    //报警背景颜色
    hanlePoliceBg=(ststus)=>{
        switch (ststus) {
            case 0:
                return "policeStatus unhanle";
            case 1:
                return "policeStatus policebg";
            case 3:
                return "policeStatus falsePolicebg";
            default:
                return;
        }
    };
    //修改报警状态
    hanlePoliceStatus=(status)=>{
        console.log(status,"status",this.state.policeCode);
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
                    this.state.policeStatus=status;
                    this.getList();
                    message.info(res.msg);
                }
            })
        }
    };
    hanleReplace=(picImg)=>{
       this.setState({
           alarmImg:picImg
       })
    };
    hanlePoliceDateil=(code)=>{
        this.params.cid=code;
        this.getList();
    };
    //查询
    handleSubmitSelect=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                let datas={
                    cid:values.cid,
                    status:values.status
                };
             /*   this.params.bdate=values.date && values.date.length?values.date[0].format("YYYY-MM-DD HH:00:00"):"";
                this.params.edate=values.date && values.date.length?values.date[1].format("YYYY-MM-DD HH:00:00"):"";*/
                this.handlePoliceList(datas);
            }
        })
    };
    disabledDate=(current)=> {
        return current && current < moment().endOf('day');
    }
    range=(start, end) =>{
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };

    disabledRangeTime=(_, type)=> {
        if (type === 'start') {
            return {
                disabledHours: () => this.range(0, 60).splice(4, 20),
                disabledMinutes: () => this.range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => this.range(0, 60).splice(20, 4),
            disabledMinutes: () => this.range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    };
    render() {
        const {getFieldDecorator}=this.props.form;
        return(
            <div className="ploceinfomation">
                <Form layout="inline" onSubmit={this.handleSubmitSelect}>
                    <Row className="ploceinfomation-query">
                        <Form.Item label="选择设备" className="choiceEqu" >
                            {getFieldDecorator('cid',{
                                initialValue:""
                            })(
                                <Select className="select-form" style={{width:120}} onChange={this.handleChange}>
                                    <Option  value="">所有</Option>
                                    {
                                        this.state.equList.map((v,i)=>(
                                            <Option key={i} value={v.code}>{v.name}</Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Form.Item label="报警状态">
                                {getFieldDecorator('status',{
                                    initialValue:""
                                })(
                                    <Select className="select-form" style={{width:120}} onChange={this.handleChange}>
                                        <Option  value="">所有</Option>
                                        <Option  value="1">警报</Option>
                                        <Option  value="3">虚警</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="选择时间">
                            {getFieldDecorator('date')(
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    disabledTime={this.disabledRangeTime}
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            )}

                            <Button className="query-btn" type="primary" htmlType="submit">搜索</Button>
                        </Form.Item>
                    </Row>
                </Form>
                <Row className="ploceinfomation-main" >
                    <div  className="main-left">
                        <Row type="flex" justify="space-around">
                            <Col className="main-left-L" span={12}>
                                <div className="img-up-fu">
                                    <div className="alarmImg">
                                        <img src={this.state.alarmImg?this.state.alarmImg:alarmBg} alt=""/>
                                        <canvas id="canvasobj" width="300px" height="278px" style={{backgroundImage:'url('+this.state.alarmImg?this.state.alarmImg:alarmBg+')',backgroundSize:"100% 100%"}} />
                                    </div>
                                    <div className="img-up-fu-word">
                                        <div className="circle" />
                                        <span className="img-up-fu-word-span">{this.state.alarm.name}</span>
                                    </div>
                                </div>
                                <div className="swiper-container">
                                    <div className="swiper-wrapper">
                                        {
                                            this.state.malarminfo.map((v,i)=>(
                                                <div key={i} className="everyImg">
                                                    <div className="swiper-slide"><img src={v.picpath?v.picpath:alarmBg} alt="" onClick={()=>this.hanleReplace(v.picpath)} /></div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col className="main-left-R" span={12}>
                                <video controls="controls" src={this.state.alarm.videopath?this.state.alarm.videopath:test2} style={{ width:'100%',height:'100%' }}/>
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
                                    <span className="equipName-right-word">{this.state.alarm.name}</span>
                                </Col>
                            </Row>
                            <Row className="equipName">
                                <Col className="equipName-left" span={8}>
                                    报警类型
                                </Col>
                                <Col className="equipName-left" span={8}>
                                    <span className="equipName-right-word">{this.state.tagType===0?"人员报警":"车辆报警"}</span>
                                </Col>
                                <Col className="equipName-right-caralarm" span={8}>
                                    <span className="equipName-right-word">{this.state.tagType===1?"车辆报警":"人员报警"}</span>
                                </Col>
                            </Row>
                            <Row className="equipName">
                                <Col className="equipName-left" span={8}>
                                    报警时间
                                </Col>
                                <Col className="equipName-right" span={16}>
                                    <span className="equipName-right-word">{this.state.alarm.atime}</span>
                                </Col>
                            </Row>
                            <Row className="showTaget">
                                <Col span={8}>
                                    <div className="showfq">
                                        <div className="zdupdate-word">防区显示</div>
                                        <div className="cicrle">
                                            <Icon className="cicrle-icon" type="check" />
                                        </div>
                                    </div>
                                    <div className="showfq">
                                        <div className="zdupdate-word">目标显示</div>
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
                                    <div className="alarmq" onClick={()=>this.hanlePoliceStatus("1")}>
                                        <span>警情</span>
                                    </div>
                                    <div className="alarmx" onClick={()=>this.hanlePoliceStatus("3")}>
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
                           {this.state.updateQuant?this.state.updateQuant:0}
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
                <Row gutter={16}>
                    {
                        this.state.policeList.map((v,i)=>(
                            <Col className="gutter-row" span={4} key={i}>
                                <div className="gutter-box" onClick={()=>this.hanlePoliceDateil(v.code)}>
                                    <img src={v.picpath?v.picpath:alarmBg} className="picImg" alt=""/>
                                    <div className="policeBottom">
                                        <span className="policeCircle" /><span className="policeName">{v.name?v.name:"无"}</span>
                                    </div>
                                    <div className={this.hanlePoliceBg(v.status)}><span className="policeStatusCicle"/><span className="policeStatusFont">{this.hanleStatus(v.status)}</span></div>
                                    <span className="policeTimes">{v.atime}</span>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        );
    }
}

export default PoliceInformation=Form.create({})(PoliceInformation);
