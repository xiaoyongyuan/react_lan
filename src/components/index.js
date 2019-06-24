/**
 * 路由组件出口文件

 */

import Csindex from './cs/';
//直播
import Broadcast from "./broadcast/Broadcast";
//设备
import Equipment from "./equipment/Equipment";
//系统
import System from "./system/System";
//报警
import Police from "./police/Police";
//报警信息
import PoliceInformation from "./police/PoliceInformation";
//报警跟踪
import AlarmTracking from "./police/AlarmTracking";
export default {
  Csindex,Police,PoliceInformation,AlarmTracking,Broadcast,Equipment,System
};
