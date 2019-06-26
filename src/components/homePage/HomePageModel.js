import React, { Component } from 'react';
import defenceImg from "../../style/ztt/imgs/defenceImg.png";
import "./homeModel.less";
import {Button} from "antd";
class HomePageModel extends Component{
    render() {
        return(
            <div className="homePageModel">
                <div className="homePageModelLeft">
                    <div className="homeImg">
                        <img src={defenceImg} alt=""/>
                    </div>
                    <div className="homeImg">
                        <img src={defenceImg} alt=""/>
                    </div>
                </div>
                <div className="homePageModelRight">
                    <div className="deviceContext">
                        <div className="nameDevice"><span>设备名称</span><span>新机房2号门</span></div>
                        <div className="nameDevice"><span>报警类型</span><span>人员报警</span><span>报警类型</span></div>
                        <div className="nameDevice"><span>报警时间</span><span>2019年7月16日</span></div>
                        <Button>防区显示</Button>
                        <Button>目标显示</Button>
                    </div>
                   <div>
                       <Button>警情</Button>
                       <Button>虚警</Button>
                   </div>
                </div>
            </div>
        );
    }
}
export default HomePageModel;