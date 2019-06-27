import React, { Component } from 'react';
import defenceImg from "../../style/ztt/imgs/defenceImg.png";
import policeImg from "../../style/ztt/imgs/policeImg.png";
import "./homeModel.less";
import {Button, Icon} from "antd";
class HomePageModel extends Component{
    render() {
        return(
            <div className="homePageModel">
                <div className="homePageModelLeft">
                    <div className="homeageImg">
                        <div className="homeImg">
                            <img src={defenceImg} alt=""/>
                        </div>
                        <div className="homeImg">
                            <img src={defenceImg} alt=""/>
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
                        <div className="nameDevice"><span className="equName">设备名称</span><span className="equTimes">新机房2号门</span></div>
                        <div className="nameDevice typePolice"><span>报警类型</span><span className="manAlarm">人员报警</span><span>报警类型</span></div>
                        <div className="nameDevice"><span className="equName">报警时间</span><span className="equTimes">2019年7月16日</span></div>
                        <Button>防区显示<span className="sectorBtn"><Icon className="cicrle-icon" type="check" /></span></Button>
                        <Button>目标显示<span className="sectorBtn"><Icon className="cicrle-icon" type="check" /></span></Button>
                    </div>
                   <div className="alarmImg">
                       <div className="alarBg">
                           <img className="policeImg" src={policeImg} />
                           <span>报警处理</span>
                       </div>
                       <div className="policeBtn">
                           <Button type="primary">警情</Button>
                           <Button type="primary">虚警</Button>
                       </div>
                   </div>
                </div>
            </div>
        );
    }
}
export default HomePageModel;