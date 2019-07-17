import React,{Component} from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import mqwl from "../../style/ztt/json/lenged";
import axios from "../../axios/index";
class EchartsLegend extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    componentDidMount() {
        let closeBtn=this.props.closeBtn;
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.closeBtn){
            this.setState({
                closeBtn:true
            })
        }
    }

    option=(cameraList)=>{
        echarts.registerMap('xicheng', mqwl);
        let equipmentList=[];
        cameraList.map((v)=>{
            if(v.lat && v.lng){
                equipmentList.push({value:[v.lng,v.lat],name:v.name})
            }
        });
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
                    data: equipmentList,
                    symbolSize: 15, //圈圈大小
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true  //字体显示
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
        return option;
    };
    onByModelClick=(e)=>{
        this.props.cameraList.map((v)=>{
            if (e.componentType === "series") {
                if(e.data.name===v.name){
                    axios.ajax({
                        method:"get",
                        url:window.g.loginURL+"/api/camera/getone",
                        data:{code:v.code}
                    }).then((res)=>{
                       this.setState({

                       })
                    })
                }
            }
        });
    };
    onClickByModel = {
        click: this.onByModelClick
    };
    render() {
        return(
            <ReactEcharts
                option={this.option(this.props.cameraList)}
                onEvents={this.onClickByModel}
                style={{width:"60%", height:"60vh"}}
            />
        );
    }

}
export default EchartsLegend;