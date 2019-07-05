(function($) {
  "use strict";
  //声明
  $.fn.initDefend = function(data) {
    return new MyinitDefend(data, this);
  };
  var perwidth = 0;
  var MyinitDefend = function(data, that) {
    var me = this;
    me.init(data, that);
    me.offsetleft = $(that).offset().left + 80; //此处that应该是 initDefend即demo1
  };

  // 初始化
  MyinitDefend.prototype.init = function(data, that) {
    var me = this;
    me.current = 0; //新增编号
    me.cando = true; //当前位置是否允许新增
    me.nowmove = -1; //当前向左向右拖动的序号
    me.newcreate = true;
    me.opts = $.extend(
      true,
      {},
      {
        //用于设弹窗默认值
        width: 900,
        timedata: [], //[{starttime:,endtime:},]
        data: [
          {
            type: "星期一"
          },
          {
            type: "星期二"
          },
          {
            type: "星期三"
          },
          {
            type: "星期四"
          },
          {
            type: "星期五"
          },
          {
            type: "星期六"
          },
          {
            type: "星期日"
          }
        ]
      },
      data
    ); //data设置的值会覆盖默认值，之后合并到{}并赋值给opts
    me.mousedown = false; //鼠标按下了吗
    //初始化
    var str = "";
    var boxwidth = me.opts.width;
    var navwidth = me.opts.width - 90;
    me.perwidth = perwidth = navwidth / 48;
    $(that).css("width", boxwidth + "px");
    var timedata = me.opts.data;

    //绘制图表
    for (var i = 0; i < 7; i++) {
      str +=
        '<div class="weekday">' +
        "<div class=xq>" +
        timedata[i].type +
        "</div>" +
        "<div>" +
        '<div class="day">';
      for (var j = 0; j < 24; j++) {
        str += '<div class="hour"><div class="halfhour"></div></div>';
      }
      str += '<div class="hour"></div></div><div class="bar">';
      str += "</div></div></div>";
      str += "</div></div></div>";
    }

    var $str = $(str);
    $(that).append($str);
    //点在蓝条条上就禁止它新建了
    $str.find(".item").on("mousedown", function(e) {
      me.cando = false;
      return false; //不再执行mouseup和click事件//防止事件冒泡
    });

    $str.find(".bar").each((k, v) => {
      v.addEventListener("mousedown", function(e) {
        if (me.cando) {
          if ($(v).find(".item").length >= 3) {
            me.newcreate = false;
            return false;
          }
          me.mousedown = true;
          me.newcreate = true;
          fnstart(e, me, this);
        }
        return false; //防止事件冒泡
      });
    });
    $("body").on("mouseup", function(e) {
      me.cando = true;
      if (me.mousedown) {
        me.mousedown = false;
        // // fnend(me);
        me.nowmove = -1;
      }
      return false; //防止事件冒泡
    });

    //注意：move事件一定要绑在body上，当鼠标移动过快可能移除那个div区域
    $(".bar").on("mousemove", function(e) {
      if (me.mousedown && me.newcreate) {
        fnmove(e, me);
      } else {
        e.preventDefault();
      }
    });
  };
  MyinitDefend.prototype.getdata = function() {
    function getReturn(item) {
      var x = parseFloat($(item).css("left")) / perwidth;
      var y = parseFloat($(item).css("width")) / perwidth + x;
      var starttime =
        Math.round(x) % 2 == 0
          ? ("0" + Math.round(x) / 2).slice(-2) + ":00"
          : ("0" + parseInt(Math.round(x) / 2)).slice(-2) + ":30";
      var endtime =
        Math.round(y) % 2 == 0
          ? ("0" + Math.round(y) / 2).slice(-2) + ":00"
          : ("0" + parseInt(Math.round(y) / 2)).slice(-2) + ":30";
      return {
        starttime: starttime,
        endtime: endtime
      };
      // var x = Math.round(parseFloat($(item).css("left")) / perwidth);
      // var res = [];
      // var y = Math.round(parseFloat($(item).css("width")) / perwidth);
      // for (var i = 0; i < y; i++) {
      //   res.push(x + i);
      // }
      // return res;
    }
    var backdata = [];

    for (let i = 0; i < $(".weekday").length; i++) {
      let weekdata = [];
      for (let j = 0; j < $($(".weekday")[i]).find(".item").length; j++) {
        weekdata.push(getReturn($($(".weekday")[i]).find(".item")[j]));
      }
      // backdata.push(`${weekdata}`);
      backdata.push(weekdata);
    }

    return backdata;
  };

  function nearest(left) {
    var yu = left % perwidth;
    if (yu < perwidth / 2) {
      return left - yu;
    } else {
      return left + (perwidth - yu);
    }
  }
  function fnstart(e, me, that) {
    me._startX = e.pageX;
    var left = me._startX - me.offsetleft;
    me.left = nearest(left);
    me.startleft = nearest(left);
    me.nowmove = me.current;
    var str =
      '<div class="item item' +
      me.current +
      '" style="left:' +
      me.left +
      'px;width:1px"  data-num="' +
      me.current +
      '"></div>';
    me.current++;
    var item = ".item" + (me.current - 1);
    $(that).append($(str));
    $(item).on("mousedown", function(e) {
      me.cando = false;
      return false;
    });
  }
  function fnmove(e, me) {
    me._curX = e.pageX;
    me._moveX = me._curX - me._startX;
    var item = ".item" + (me.current - 1);
    if (me._moveX > 0 && me._moveX < me.perwidth * 48 - me.startleft) {
      me.width = me._moveX;
      $(item).css("width", me._moveX + "px");
    } else if (me._moveX > 0 && me._moveX >= me.perwidth * 48 - me.startleft) {
      me.width = me.perwidth * 48 - me.startleft;
      $(item).css("width", me.perwidth * 48 - me.startleft + "px");
    } else {
      me.width = 0;
      $(item).css("width", 0);
    }
  }
})(window.jQuery);
