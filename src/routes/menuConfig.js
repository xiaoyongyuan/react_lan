export default {
  menuList: [
    {
      title: "首页",
      key: "/main/cs",
      component: "Csindex",
      //icon: "action-shujuzonglan",
    },
    {
        title: "报警",
        key: "/main/police",
        component: "Police",
        children:[
            {
                title: "报警信息",
                key: "/main/policeInformation",
                component: "PoliceInformation",
            },
            {
                title: "报警跟踪",
                key: "/main/alarmTracking",
                component: "AlarmTracking",
            }
        ]
    },
      {
          title: "直播",
          key: "/main/broadcast",
          component: "Broadcast",
          //icon: "action-shujuzonglan",
      },
      {
          title: "设备",
          key: "/main/equipment",
          component: "Equipment",
          //icon: "action-shujuzonglan",
      },
      {
          title: "系统",
          key: "/main/system",
          component: "System",
          //icon: "action-shujuzonglan",
      },
  ],
  other: [

  ]
};
