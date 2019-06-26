import React, { Component } from 'react';
import "../../style/ztt/css/electronicMap.less";
import {Button} from "antd";
import pingmian from "../../style/ztt/imgs/pingmian.png";
class ElectronicMap extends Component{
    render() {
        return (
            <div className="electronicMap">
                <div className="showDraw">
                    <div className="showDraw-title">傲科云服务器机房</div>
                    <div className="showDrawImg">
                        <img src={pingmian} alt=""/>
                    </div>
                </div>
                <div className="drawing">
                    <div className="Square">
                        <span className="drawImg"/>
                        <span>绘制功能</span>
                    </div>
                    <div className="segment">
                        <span className="segmentImg"/>
                        <span>线段绘制</span>
                    </div>
                    <div className="rectangle">
                        <span className="rectangleImg"/>
                        <span>矩形绘制</span>
                    </div>
                    <div className="camera">
                        <span className="cameraImg"/>
                        <span>摄像机绘制</span>
                    </div>
                    <div className="revoke">
                        <div className="revokeLeft"><span /></div>
                        <div className="revokeRight"><span /></div>
                    </div>
                    <div className="reBtn">
                        <Button className="revokeBtn">重置</Button>
                    </div>
                    <div className="confirmBnt">确认</div>
                </div>
            </div>
        );
    }
}
export default ElectronicMap;