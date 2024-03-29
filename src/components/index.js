/**
 * 路由组件出口文件

 */

import Index from "./homePage/index";
//直播
import Broadcast from "./broadcast/Broadcast";
import Live from "./live/Live";
//设备
import Equipment from "./equipment/Equipment";
//添加设备
import EquipSet from "./equipment/EquipSet";
//报警信息
import PoliceInformation from "./police/PoliceInformation";
//报警跟踪
// import AlarmTracking from "./police/AlarmTracking";
//系统
import Overview from "./system/Overview";
import SysReset from "./system/SysReset";
import UserInfo from "./system/UserInfo";
import NetworkSettings from "./system/NetworkSettings";
import TimesSettings from "./system/TimesSettings";
import RecycleBin from "./system/RecycleBin";
import CloudSynchr from "./system/CloudSynchr.js";
import UpgradeSystem from "./system/UpgradeSystem.js";
import ElectronicMap from "./system/ElectronicMap.js";
import Operational from "./system/Operational";
import GroupManagement from "./system/GroupManagement";
//登录
import Login from "./login/index";
export default {
  Index,
  PoliceInformation,
  Broadcast,
  Equipment,
  EquipSet,
  Overview,
  SysReset,
  UserInfo,
  NetworkSettings,
  TimesSettings,
  RecycleBin,
  CloudSynchr,
  UpgradeSystem,
  ElectronicMap,
  Operational,
  Login,
  Live,
  GroupManagement
};
