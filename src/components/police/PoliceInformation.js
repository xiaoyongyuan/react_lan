import React, { Component } from 'react';
import { Row, Col, Select,DatePicker,Button,Icon,Form,message,Pagination,Switch,Checkbox} from 'antd';
import "./ploceinfomation.less";
import alarmcl from "../../style/imgs/alarmcl.png";
import alarmBg from "../../style/ztt/imgs/defenceImg.png";
import axios from "../../axios/index";
import moment from "moment";
import nodata from "../../style/imgs/nodata.png";
import ImageMagnifier from "./ImgeMagnifier";
const { Option } = Select;
const { RangePicker } = DatePicker;
class PoliceInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alarm: {},
            malarminfo: [],
            policeList:[],
            equList:[],
            page:1,
            pagesize:30,
            field:true, //是否显示围界信息
            obj:true, //是否显示报警对象
            checkedVal:false,
            policeListCode:'',
            selectstatus:0,//select默认选中的状态
            policeListIndex:0,//初始化报警下标
            nextcode:"",//下一个
            lastcode:"",//上一个
            magnifierOff:false,
            widthEnlarge:"",//放大图片的宽度
            heightNarrow:""//放大图片的高度
        };
    }
    componentDidMount() {
       this.hanleEquipment();
       this.hanleQuantity();
       this.handlePoliceList();
    }
    params={
        bdate:"",
        edate:"",
    };
    //报警列表
    handlePoliceList=()=>{
        let params={
            status:this.state.selectstatus,
            pageindex:this.state.page,
            pagesize:this.state.pagesize,
            cid:this.state.scid,
            bdate:this.params.bdate,
            edate:this.params.edate
        };
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/alarm/alarmlist",
            data:params
        }).then((res)=>{
            if(res.success){
                this.setState({
                    policeList:res.data,
                    totalcount:res.totalcount,
                });
                if(res.data.length>0){
                    this.setState({
                        policeListCode:res.data[0].code
                    })
                }
                this.getInfor();
            }
        })
    };
    getInfor=()=>{
        if(this.state.policeList.length>0){
            if(this.state.policeListCode){
                axios.ajax({
                    method:"get",
                    url:window.g.loginURL+"/api/alarm/alarminfo",
                    data:{
                        cid:this.state.scid,
                        bdate:this.params.bdate,
                        edate:this.params.edate,
                        code:this.state.policeListCode,
                        status:this.state.selectstatus,
                    }
                }).then((res)=>{
                    if(res.success){
                      if(res.data.Malarm && res.data){
                            res.data.Malarm.fieldresult.map((v)=>{
                               this.setState({
                                   tagType:v.tag
                               });
                            });
                          this.setState({
                              alarm:res.data.Malarm,
                              alarmCid:res.data.Malarm.cid,
                              alarmImg:res.data.Malarm.picpath,
                              malarminfo:res.data.Malarm.Malarminfo,
                              fields:res.data.Malarm.field,
                              fieldresult:res.data.Malarm.fieldresult,
                              policeListCode:res.data.Malarm.code,
                              pic_width:res.data.Malarm.pic_width,
                              pic_height:res.data.Malarm.pic_height,
                              nextcode:res.data.Malarm.nextcode,
                              lastcode:res.data.Malarm.lastcode
                          },()=>{
                              this.draw();
                              this.updateStatus();
                          })
                      }
                    }
                })
            }
        }
    };
    updateStatus=(state)=>{
        switch (state) {
            case 0:
                return"未处理";
            case 1:
                return "警情";
            case 3:
                return "虚警";
            default:
                return"未处理";
        }
    };
    //围界去重
    hanleRemoval=(e)=>{
        e.preventDefault();
            let ele = document.getElementById("canvasobj");
            let canvsclent = ele.getBoundingClientRect();
            let canvW=e.clientX-canvsclent.left;
            let canvH=e.clientY-canvsclent.top;
            let cavProportionW=parseInt((ele.width / canvsclent.width)*canvW);
            let cavProportionH=parseInt((ele.height / canvsclent.height)*canvH);
            this.setState({
                cavProportionW,cavProportionH
            })
    };
    //画围界
    draw=()=>{
        let ele = document.getElementById("canvasobj");
        let area = ele.getContext("2d");
        area.clearRect(0, 0, 704, 576);//清除之前的绘图
        area.lineWidth = 1;
        if(this.state.alarmImg){
            const datafield = this.state.fields;
            if (this.state.field && datafield.length>0) {
                const xi=510/704, yi=340/576;
                let areafield = ele.getContext("2d");
                for(let i=0;i<datafield.length;i++){
                    let list=datafield[i].pointList;
                    for(let a=0;a<list.length;a++){
                        areafield.lineWidth = 1;
                        areafield.strokeStyle = '#f00';
                        areafield.beginPath();
                        areafield.moveTo(parseInt(list[0][0] * xi), parseInt(list[0][1] * yi));
                        areafield.lineTo(parseInt(list[1][0] * xi), parseInt(list[1][1] * yi));
                        areafield.lineTo(parseInt(list[2][0] * xi), parseInt(list[2][1] * yi));
                        areafield.lineTo(parseInt(list[3][0] * xi), parseInt(list[3][1] * yi));
                        areafield.lineTo(parseInt(list[4][0] * xi), parseInt(list[4][1] * yi));
                        areafield.lineTo(parseInt(list[5][0] * xi), parseInt(list[5][1] * yi));
                        areafield.lineTo(parseInt(list[0][0] * xi), parseInt(list[0][1] * yi));
                        areafield.stroke();
                        areafield.closePath();
                   }
                }
            }
            const objs = this.state.fieldresult;
            if (this.state.obj && objs.length>0) {
                //计算缩放比例
                const x = 510 / this.state.pic_width, y = 340 / this.state.pic_height;
                objs.map((el, i) => {
                    area.strokeStyle = '#ff0';
                    area.beginPath();
                    area.rect(parseInt(el.x * x), parseInt(el.y * y), parseInt(el.w * x), parseInt(el.h * y));
                    area.stroke();
                    area.closePath();
                    return '';
                })
            }
        }
    };
    //鼠标移入打开放大
    hanleEnter=()=>{
        this.setState({
            magnifierOff:true
        })
    };
    //鼠标离开关闭放大
    hanleMouseLeave=()=>{
        this.setState({
            magnifierOff:false
        })
    };
    //去重
    hanleAddremoval=()=>{
        this.setState({
            magnifierOff:false
        })
        /* if(this.state.cavProportionW && this.state.cavProportionH){
             const xi = 510 / this.state.pic_width, yi = 340 / this.state.pic_height;
             this.state.fieldresult.map((v)=>{
                 if(this.state.cavProportionW>=parseInt(v.x*xi) && this.state.cavProportionW<=parseInt((v.x+v.w)*xi) && this.state.cavProportionH>=parseInt(v.y*yi) && this.state.cavProportionH<=parseInt((v.y+v.h)*yi)){
                     axios.ajax({
                         method:"post",
                         url:window.g.loginURL+"/api/alarm/distinctpoint",
                         data:{
                             cid:this.state.alarmCid,
                             finalinfo:JSON.stringify(v)
                         }
                     }).then((res)=>{
                        message.info(res.msg)
                     })
                 }
             });
         }else{
             message.warning("请点击目标对象!");
         }*/
    }
    //动态获取报警图片的宽度和高度
    hanleLoad=()=>{
        this.setState({
            widthEnlarge:this.refs.alarmImg.getBoundingClientRect().width,
            heightNarrow:this.refs.alarmImg.getBoundingClientRect().height
        });
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
        if(this.state.policeListCode){
            this.state.policeList.map((v,i)=>{
                if(v.code===this.state.policeListCode){
                    this.setState({policeListIndex:i})
                }
            });
            axios.ajax({
                method:"get",
                url:window.g.loginURL+"/api/alarm/setalastatus",
                data:{
                    acode:this.state.policeListCode,
                    status:status
                }
            }).then((res)=>{
                if(res.success){
                    let oldPoilice=this.state.alarm;
                    oldPoilice.status=res.data.status;
                    let policeList=this.state.policeList;
                    policeList[this.state.policeListIndex].status=res.data.status;
                    this.setState({oldPoilice,policeList});
                    message.info("操作成功!")
                }
            })
        }
    };
    //多条报警图片
    hanleReplace=(picImg)=>{
        this.setState({
            alarmImg:picImg.picpath,
            fields:picImg.field,
            fieldresult:picImg.fieldresult,
            pic_width:picImg.pic_width,
            pic_height:picImg.pic_height,
        },()=>{
            this.draw();
        })
    };
    //查看详情
    hanlePoliceDateil=(code,index)=>{
        this.setState({
            policeListCode:code,
            policeListIndex:index,
        },()=>{
            this.getInfor();
        });
    };
    //查询
    handleSubmitSelect=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                if(values.date && values.date.length){
                    let beforeTime = moment(values.date[0]).format('YYYY-MM-DD HH:mm:ss');
                    let mydate = moment(moment(values.date[1]).format('YYYY-MM-DD HH:mm:ss'));
                    let days=mydate.diff(beforeTime, 'day');
                    if(days<=1) {
                       this.params.bdate=values.date && values.date.length?values.date[0].format("YYYY-MM-DD HH:mm:ss"):"";
                       this.params.edate=values.date && values.date.length?values.date[1].format("YYYY-MM-DD HH:mm:ss"):"";
                    }else{
                        message.error('请选择1天以内的时间');
                    }
                }else{
                    this.params.bdate=values.date && values.date.length?values.date[0].format("YYYY-MM-DD HH:mm:ss"):"";
                    this.params.edate=values.date && values.date.length?values.date[1].format("YYYY-MM-DD HH:mm:ss"):"";
                }
                this.setState({
                    scid:values.cid,
                    selectstatus:values.status,
                    page:1,
                },()=>{
                    this.handlePoliceList();
                });
            }
        })
    };
    //分页
    hanlePage=(page)=>{
        this.setState({
            page:page,
        },()=>{
            this.handlePoliceList()
        })
    };
    //控制显示围界与对象
    onChangeCumference=(checked,text)=>{
        this.setState({
            [text]: checked,
        },()=>{
            this.draw();
        });
    };
    //自动更新
    hanleUpdate=(e)=>{
        this.setState({
            checkedVal:e.target.checked
        },()=>{
            if(this.state.checkedVal){
                this.timer=setInterval(()=>this.handlePoliceList(),3000);
                this.updateNum=setInterval(()=>this.hanleQuantity(),3000);
            }else{
                clearInterval(this.timer);
                clearInterval(this.updateNum);
            }
        })
    };
    onShowSizeChange=(current, pageSize)=> {
        this.setState({
            pagesize:pageSize,
        },()=>{
            this.handlePoliceList();
        });
    };
    //上一个
    hanleUper=(text)=>{
        this.setState({
            policeListCode:this.state[text]
        },()=>{
            this.getInfor();
        })
    };
    hanleBorder=(index)=>{
       if(this.state.policeListCode===index){
           return "selectBorder";
       }
    };
    disabledDate = (current) => {
        return current > moment().endOf('day');
    };
    componentWillUnmount() {
        clearInterval(this.timer);
        clearInterval(this.updateNum);
    }
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
                                <Select className="select-form" style={{width:120}}>
                                    <Option value="">全部</Option>
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
                                    initialValue:"0"
                                })(
                                    <Select className="select-form" style={{width:120}}>
                                        <Option  value="-1">全部</Option>
                                        <Option  value="1">警情</Option>
                                        <Option  value="0">未处理</Option>
                                        <Option  value="3">虚警</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="选择时间">
                            {getFieldDecorator('date')(
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    showTime={{ format: 'YYYY-MM-DD HH:mm:ss' }}
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
                                    <div className="alarmImg" ref="alarmImg" onLoad={this.hanleLoad}>
                                        <canvas id="canvasobj"  onClick={this.hanleRemoval} onMouseEnter={this.hanleEnter} width="510px" height="340px" style={{backgroundImage:'url('+this.state.alarmImg+')',backgroundSize:"100% 100%"}} />
                                        <img src={nodata} alt="" className="nodata" style={{display:this.state.alarmImg?"none":"block"}} />
                                        {
                                            this.state.magnifierOff?(
                                                <ImageMagnifier minImg={this.state.alarmImg} maxImg={this.state.alarmImg}  mouseLeave={this.hanleMouseLeave} widthEnlarge={this.state.widthEnlarge} heightNarrow={this.state.heightNarrow}  />
                                            ):null}

                                    </div>
                                    <div className="img-up-fu-word">
                                        <div className="circle" />
                                        <span className="img-up-fu-word-span">{this.state.alarm.name}</span>
                                    </div>
                                </div>
                            </Col>
                            <Col className="main-left-R" span={12}>
                                <video controls="controls" src={this.state.alarm.videopath} style={{ width:'96%',height:'100%' }}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className="smallImg">
                                    {
                                        this.state.malarminfo.length>0?[this.state.malarminfo.map((v,i)=>(
                                            <div key={i} className="everyImg">
                                                <img src={v.picpath?v.picpath:alarmBg} alt="" onClick={()=>this.hanleReplace(v)} />
                                            </div>
                                        ))]:[<div className="everyImg">
                                            <img src={this.state.alarm.picpath} alt="" />
                                        </div>]
                                    }
                                </div>
                            </Col>
                            <Col span={12} className="updown">
                                <Button onClick={()=>this.hanleUper("lastcode")} disabled={this.state.lastcode?false:true}><div className="updown-left"><Icon type="arrow-left" style={{ color: '#fff' }} /></div>上一个</Button>
                                <Button onClick={()=>this.hanleUper("nextcode")} disabled={this.state.nextcode?false:true}><div className="updown-left"><Icon type="arrow-right" style={{ color: '#fff' }}  /></div>下一个</Button>
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
                                    <span className="equipName-right-word">{this.state.tagType===0?"车辆报警":"人员报警"}</span>
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
                            <Row className="equipName">
                                <Col className="equipName-left" span={8}>
                                    报警状态
                                </Col>
                                <Col className="equipName-right" span={16}>
                                    <span className="equipName-right-word">{this.updateStatus(this.state.alarm.status?this.state.alarm.status:"")}</span>
                                </Col>
                            </Row>
                            <Row className="showTaget">
                                <Col span={8}>
                                    <div className="showfq" style={{display:this.state.alarmImg?"block":"none"}}>
                                        <div className="zdupdate-word">防区显示&nbsp;<Switch size="small" checked={this.state.field} onChange={(checked)=>this.onChangeCumference(checked,'field')} /></div>
                                    </div>
                                    <div className="showfq" style={{display:this.state.alarmImg?"block":"none"}}>
                                        <div className="zdupdate-word">目标显示&nbsp;<Switch size="small" checked={this.state.obj} onChange={(checked)=>this.onChangeCumference(checked,'obj')} /></div>
                                    </div>
                                </Col>
                                <Col span={16} className="addqc">
                                    <div className="addqcdiv">
                                        <span onClick={this.hanleAddremoval}>添加去重</span>
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
                            <div className="zdupdate-word">自动更新&nbsp;<Checkbox checked={this.state.checkedVal} onChange={this.hanleUpdate} /></div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    {
                        this.state.policeList.map((v,i)=>(
                            <Col className={"gutter-row "+this.hanleBorder(v.code)} xxl={4} xl={6} key={i} >
                                 <div className="gutter-box policeList" onClick={()=>this.hanlePoliceDateil(v.code,i)}>
                                       <img src={v.picpath?v.picpath:alarmBg} className="picImg" alt=""/>
                                       <div className="policeBottom">
                                           <span className="policeCircle" /><span className="policeName">{v.name}</span>
                                       </div>
                                       <div className={this.hanlePoliceBg(v.status)}><span className="policeStatusCicle"/><span className="policeStatusFont">{this.hanleStatus(v.status)}</span></div>
                                       <span className="policeTimes">{v.atime}</span>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
                <div className="nodata"><img src={nodata} alt="" style={{width:"80px",height:"78px",display:this.state.policeList.length>0?"none":"block"}} /></div>
                <div className="pagination"><Pagination showSizeChanger={true} hideOnSinglePage={true}  onShowSizeChange={this.onShowSizeChange} defaultCurrent={this.state.page} current={this.state.page} total={this.state.totalcount} pageSize={this.state.pagesize} onChange={this.hanlePage} style={{display:this.state.policeList.length>0?"block":"none"}} /></div>
            </div>
        );
    }
}

export default PoliceInformation=Form.create({})(PoliceInformation);
