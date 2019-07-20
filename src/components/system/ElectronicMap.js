import React, { Component } from 'react';
import "../../style/ztt/css/electronicMap.less";
import axios from "../../axios/index";
class ElectronicMap extends Component{
    constructor (props) {
        super (props);
        this.state = {
            searchContent:'',
        };
        this.mapJson={
            "type": "FeatureCollection",
            "features":[]
        };
        this.LatitudeArr=[];
    }
    componentDidMount() {
        const _this = this;
        let content = _this.refs.container;
        let map = new window.AMap.Map(content,{
            resizeEnable:true,
            zoom:14
        });
        var mouseTool = new window.AMap.MouseTool(map);
        //监听draw事件可获取画好的覆盖物
        var overlays = [];
        mouseTool.on('draw',function(e){
            overlays.push(e.obj);
            let polygonItem = e.obj;
            let path = polygonItem.getPath();//取得绘制的多边形的每一个点坐标
            path.map((v)=>{
                _this.LatitudeArr.push([v.lng,v.lat]);
            });
            for(let i=0;i<overlays.length;i++){
                _this.mapJson.features.push({
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": _this.LatitudeArr
                    }
                })
            }
            console.log(_this.mapJson);
        });
        function draw(type){
            switch(type){
               /* case 'marker':{
                    mouseTool.marker({});
                    break;
                }
                case 'polyline':{
                    mouseTool.polyline({
                        strokeColor:'#c3742b'
                    });
                    break;
                }*/
                case 'polygon':{
                    mouseTool.polygon({
                        fillColor:'#afb8ff',
                        strokeColor:'#8a59fb'
                    });
                    break;
                }
                case 'rectangle':{
                    mouseTool.rectangle({
                        fillColor:'#ffafaf',
                        strokeColor:'#d87474'
                    });
                    break;
                }
               /* case 'circle':{
                    mouseTool.circle({
                        fillColor:'#5acafb',
                        strokeColor:'#3fa7d3'
                    });
                    break;
                }*/
            }
        }
        var radios = document.getElementsByName('func');
        for(var i=0;i<radios.length;i+=1){
            radios[i].onchange = function(e){
                draw(e.target.value);
            }
        }
        draw('marker');
        document.getElementById('clear').onclick = function(){
            map.remove(overlays);
            overlays = [];
        };
        document.getElementById('close').onclick = function(){
            mouseTool.close(true);//关闭，并清除覆盖物
            for(var i=0;i<radios.length;i+=1){
                radios[i].checked = false;
            }
        }
    }
    hanleMap=()=>{
        if(this.LatitudeArr.length>0){
            axios.ajax({
                method:"get",
                url:window.g.loginURL+"/api/system/elemap",
                data:{
                    data:this.mapJson
                }
            }).then((res)=>{})
        }
    };
    render() {
        return (
            <div className="electronicMap">
                <div className="container" ref="container"></div>
                <div className='info'>操作说明：圆和矩形通过拖拽来绘制，其他覆盖物通过点击来绘制</div>
                <div className="input-card">
                    <div className="input-item">
                       {/* <input type="radio" name='func' value='marker'/><span className="input-text">画点</span>
                        <input type="radio" name='func' value='polyline'/><span className="input-text">画折线</span>*/}
                        <input type="radio" name='func' value='polygon'/><span className="input-text" >画多边形</span>
                        <input type="radio" name='func' value='rectangle'/><span className="input-text">画矩形</span>
                        {/*<input type="radio" name='func' value='circle'/><span className="input-text">画圆</span>*/}
                    </div>
                    <div className="input-item">
                        <input id="clear" type="button" className="btn" value="清除"/>
                        <input id="close" type="button" className="btn" value="关闭绘图"/>
                        <input type="button" className="btn" value="确定" onClick={this.hanleMap} />
                    </div>
                </div>
            </div>
        )
    }
}
export default ElectronicMap;