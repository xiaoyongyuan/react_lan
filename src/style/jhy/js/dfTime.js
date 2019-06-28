(function($) {
  "use strict";
  //声明
  $.fn.initDefend = function(data) {
    console.log("initDefend fun this", this);
    return new MyinitDefend(data, this);
  };
  var perwidth = 0;
  var MyinitDefend = function(data, that) {
    var me = this;
    console.log("MyinitDefend fun this/me", this);
    console.log("MyinitDefend fun------------- that", that);

    me.init(data, that);
    me.offsetleft = $(that).offset().left + 80; //此处that应该是 initDefend即demo1
  };
  function getMytime(date) {
    if (date.split(" ")[1] == "24:00:00") {
      return 24;
    } else {
      var time = new Date(date.replace(/-/g, "/"));
      if (time.getMinutes() > 10) {
        return time.getHours() + 0.5;
      } else {
        return time.getHours();
      }
    }
  }
  // 初始化
  MyinitDefend.prototype.init = function(data, that) {
    var me = this;
    console.log("MyinitDefend init 中的 this/me", this);
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
            type: "星期一",
            timeSlot: []
          },
          {
            type: "星期二",
            timeSlot: []
          },
          {
            type: "星期三",
            timeSlot: []
          },
          {
            type: "星期四",
            timeSlot: []
          },
          {
            type: "星期五",
            timeSlot: []
          },
          {
            type: "星期六",
            timeSlot: []
          },
          {
            type: "星期日",
            timeSlot: []
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
    var restime = me.opts.timedata; //[]
    var timedata = me.opts.data; //[最终数据，格式]

    //遍历每天的时间段，并添加到最终显示的时间数组中
    $.each(restime, function(i, obj) {
      var day = new Date(obj.starttime.replace(/-/g, "/")).getDay() - 1;
      if (day == -1) day = 6;
      timedata[day]["timeSlot"].push([
        getMytime(obj.starttime),
        getMytime(obj.endtime)
      ]);
    });

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
      if (timedata.length == 0) {
        str += "</div></div></div>";
      } else {
        for (var t = 0; t < timedata[i].timeSlot.length; t++) {
          var left = (navwidth * timedata[i].timeSlot[t][0]) / 24;
          var width =
            (navwidth *
              (timedata[i].timeSlot[t][1] - timedata[i].timeSlot[t][0])) /
            24;
          str +=
            '<div class="item item' +
            me.current +
            '" style="left:' +
            left +
            "px;width:" +
            width +
            'px" data-num="' +
            me.current +
            '"></div>';
          me.current++;
        }
        str += "</div></div></div>";
      }
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
            return false; //最多三个，
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
        fnend(me);
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
    var backdata = [];
    // var day = new Map();
    var day = [];
    var weekdata = [];
    $.each($(".weekday"), function(i, obj) {
      console.log(obj);
      $.each($(obj).find(".item"), function(j, obj1) {
        var x = parseFloat($(obj1).css("left")) / perwidth;
        var y = parseFloat($(obj1).css("width")) / perwidth + x;
        var starttime =
          Math.round(x) % 2 == 0
            ? ("0" + Math.round(x) / 2).slice(-2) + ":00"
            : ("0" + parseInt(Math.round(x) / 2)).slice(-2) + ":30";
        var endtime =
          Math.round(y) % 2 == 0
            ? ("0" + Math.round(y) / 2).slice(-2) + ":00"
            : ("0" + parseInt(Math.round(y) / 2)).slice(-2) + ":30";
        console.log(j, obj1, "---------------");
        weekdata.push({
          starttime: starttime,
          endtime: endtime
        });
        console.log(weekdata, "weekdata");
      });
      // backdata[i] = {weekdata};
      // backdata[i] = [i + 1, i + 2];
    });
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
    console.log("新建" + me.nowmove + me.left);
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

  function fnend(me, i) {
    var width = me.width;
    var left = me.left;
    var item = ".item" + me.nowmove;
    if (width == 0) {
      $(item).remove();
    } else {
      $(item).css("width", nearest(width) + "px");
      $(item).css("left", nearest(left) + "px");
      var result = getResult(item);
      var items = $(item)
        .parent()
        .find(".item");
      if (result.length < items.length) {
        $.each(items, function(i, obj) {
          if (i < result.length) {
            $(obj).css({
              left: result[i][0] + "px",
              width: result[i][1] + "px"
            });
          } else {
            $(obj).remove();
          }
        });
      }
      me.width = 0;
    }
    //松手后才能修改值
  }

  function getResult(item) {
    var array = [];
    var arrayresult = [];
    var $item = $(item)
      .parent()
      .find(".item");
    $.each($item, function(i, obj) {
      var left = parseFloat($(obj).css("left"));
      var width = parseFloat($(obj).css("width"));
      array.push([left, left + width]);
    });
    var sortarray = bubbleSort(array);
    //var sortarray = array.sort();
    var temp = sortarray[0];
    console.log("排序后：");
    console.log(sortarray);
    for (var i = 0; i < sortarray.length; i++) {
      if (!sortarray[i + 1]) {
        arrayresult.push(temp);
        break;
      }
      if (temp[1] < sortarray[i + 1][0]) {
        arrayresult.push(temp);
        temp = sortarray[i + 1];
      } else {
        if (temp[1] <= sortarray[i + 1][1]) {
          temp = [temp[0], sortarray[i + 1][1]];
        } else {
          temp = [temp[0], temp[1]];
        }
      }
    }
    console.log("小仙女变身后：");
    console.log(arrayresult);
    var huanyuan = [];
    for (var j = 0; j < arrayresult.length; j++) {
      huanyuan.push([arrayresult[j][0], arrayresult[j][1] - arrayresult[j][0]]);
    }
    return huanyuan;
  }

  function bubbleSort(array) {
    for (var unfix = array.length - 1; unfix > 0; unfix--) {
      for (var i = 0; i < unfix; i++) {
        if (array[i][0] > array[i + 1][0]) {
          var temp = array[i];
          array.splice(i, 1, array[i + 1]);
          array.splice(i + 1, 1, temp);
        }
      }
    }
    return array;
  }
})(window.jQuery);
