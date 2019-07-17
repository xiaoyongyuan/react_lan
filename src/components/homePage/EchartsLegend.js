import React,{Component} from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import mqwl from "../../style/ztt/json/lenged";
class EchartsLegend extends Component{
    render() {
        echarts.registerMap('xicheng', mqwl);
        const option = {
            geo: {
                map: 'xicheng',
                roam: false,
                aspectScale:.8, //长宽比
                zoom:1.2, //当前视角的缩放比例
                //取消鼠标移入地图上的文字
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        //          color: '#ddd',
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        areaColor: "#35425F",
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        // shadowColor: 'rgba(255, 255, 255, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                    emphasis:{
                        areaColor:"#35425F" //悬浮时的颜色
                    },
                }
            },
            series:[
                {
                    name: 'light',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: [
                        {name:"阿房工",value:[108.83,34.26]}
                    ],
                    symbolSize: 15, //圈圈大小
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false  //字体显示
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4258e'
                        }
                    }
                }
            ]
        };
        return(
            <ReactEcharts
                option={option}
                style={{width:"60%", height:"60vh"}}
            />
        );
    }

}
export default EchartsLegend;