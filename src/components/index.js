/**
 * 路由组件出口文件

 */

import Index from './homePage/index';
//直播
import Broadcast from "./broadcast/Broadcast";
//设备
import Equipment from "./equipment/Equipment";
//系统
import System from "./system/System";
//报警信息
import PoliceInformation from "./police/PoliceInformation";
//报警跟踪
import AlarmTracking from "./police/AlarmTracking";
export default {
    Index,PoliceInformation,AlarmTracking,Broadcast,Equipment,System
};
