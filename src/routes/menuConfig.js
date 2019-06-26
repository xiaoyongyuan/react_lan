export default {
  menuList: [
    {
      title: "首页",
      key: "/main/index",
      component: "Index",
      icon: "home",
    },
    {
      title: "报警",
      key: "/police",
      icon:"alert",
      children: [
        {
          title: "报警信息",
          key: "/main/policeInformation",
          component: "PoliceInformation"
        },
        {
          title: "报警跟踪",
          key: "/main/alarmTracking",
          component: "AlarmTracking"
        }
      ]
    },
    {
      title: "直播",
      key: "/main/broadcast",
      component: "Broadcast",
      icon: "play-square",
    },
    {
      title: "设备",
      key: "/main/equipment",
      component: "Equipment",
      icon: "tablet",
    },
    {
      title: "系统",
      key: "/main/system",
      icon: "bars",
      children: [
          {
              title: "系统概览",
              key: "/main/overview",
              component: "Overview"
          },
          {
              title: "用户管理",
              key: "/main/userInfo",
              component: "UserInfo"
          },
          {
              title: "网络设置",
              key: "/main/networkSettings",
              component: "NetworkSettings"
          },
          {
              title: "时间设置",
              key: "/main/timesSettings",
              component: "TimesSettings"
          }
          ,
          {
              title: "回收站",
              key: "/main/recycleBin",
              component: "RecycleBin"
          }
          ,
          {
              title: "操作记录",
              key: "/main/operational",
              component: "Operational"
          }
          ,
          {
              title: "系统升级",
              key: "/main/upgradeSystem",
              component: "UpgradeSystem"
          }
          ,
          {
              title: "电子地图绘制",
              key: "/main/electronicMap",
              component: "ElectronicMap"
          }
          ,
          {
              title: "云端同步",
              key: "/main/cloudSynchr",
              component: "CloudSynchr"
          }
      ]
    }
  ],
  other: [
    {
      key: "/main/equipadd",
      component: "EquipAdd"
    }
  ]
};
