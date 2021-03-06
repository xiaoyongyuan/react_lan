export default {
  menuList: [
    {
      title: "首页",
      key: "/main/index",
      component: "Index",
      icon: "home"
    },
    {
      title: "报警",
      key: "/main/policeInformation",
      icon: "alert",
      component: "PoliceInformation"
    },
    {
      title: "直播",
      key: "/main/broadcast",
      component: "Broadcast",
      icon: "play-square"
    },
    {
      title: "设备",
      key: "/main/equipment",
      component: "Equipment",
      icon: "tablet"
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
//        {
//          title: "系统初始化",
//          key: "/main/sysreset",
//          component: "SysReset"
//        },
        {
          title: "用户管理",
          key: "/main/userInfo",
          component: "UserInfo"
        },
        {
          title: "分组管理",
          key: "/main/groupManagement",
          component: "GroupManagement"
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
        },
        {
          title: "回收站",
          key: "/main/recycleBin",
          component: "RecycleBin"
        },
        {
          title: "操作记录",
          key: "/main/operational",
          component: "Operational"
        },
        {
          title: "系统升级",
          key: "/main/upgradeSystem",
          component: "UpgradeSystem"
        },
        {
          title: "电子地图绘制",
          key: "/main/electronicMap",
          component: "ElectronicMap"
        }
        /*{
              title: "云端同步",
              key: "/main/cloudSynchr",
              component: "CloudSynchr"
          }*/
      ]
    }
  ],
  menuList1:[
      {
          title: "首页",
          key: "/main/index",
          component: "Index",
          icon: "home"
      },
      {
          title: "报警",
          key: "/main/policeInformation",
          icon: "alert",
          component: "PoliceInformation"
      },
      {
          title: "直播",
          key: "/main/broadcast",
          component: "Broadcast",
          icon: "play-square"
      },
      {
          title: "设备",
          key: "/main/equipment",
          component: "Equipment",
          icon: "tablet"
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
//        {
//          title: "系统初始化",
//          key: "/main/sysreset",
//          component: "SysReset"
//        },
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
              },
              {
                  title: "回收站",
                  key: "/main/recycleBin",
                  component: "RecycleBin"
              },
              {
                  title: "操作记录",
                  key: "/main/operational",
                  component: "Operational"
              },
              {
                  title: "系统升级",
                  key: "/main/upgradeSystem",
                  component: "UpgradeSystem"
              }
          ]
      }
  ],
  other: [
    {
      key: "/main/equipset:add",
      component: "EquipSet"
    },
    {
      key: "/main/equipset",
      component: "EquipSet"
    },
    {
      key: "/login",
      component: "Login"
    },
    {
      key: "/main/live",
      component: "Live"
    }
  ]
};
