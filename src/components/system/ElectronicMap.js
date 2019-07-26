import React, { Component } from 'react';
import "../../style/ztt/css/electronicMap.less";
import L from 'leaflet';
import {message,Button} from "antd";
import axios from "../../axios/index";
import $ from "jquery";
import noStatus from "../../style/ztt/imgs/noStatus.png";
var map={};
var coordinate ={
    "type": "FeatureCollection",
    "features":[]
};
var line={
    "type": "FeatureCollection",
    "features":[{
        "type": "Feature",
        "properties": {
            "color": "#53d853"
        },
        "geometry": {
            "type": "LineString",
            "coordinates":[]
        }
    }]
};
var polygon={
    "type": "FeatureCollection",
    "features":[{
        "type": "Feature",
        "properties": {
            "color": "#53d853"
        },
        "geometry": {
            "type": "Polygon",
            "coordinates":[[]]
        }
    }]
};
class ElectronicMap extends Component{
    constructor (props) {
        super (props);
        this.state = {
            searchContent:'',
            cameraList:[],
            btnFalse:false,
            count:0
        };
    }
    componentDidMount() {
        this.hanleCamera();
        this.hannleMap();
        console.log(line.features[0].geometry.coordinates,polygon.features[0].geometry.coordinates)
    };
    hannleMap=()=>{
        map = L.map('container').setView([34.276113,108.95378], 12);
        var ls = [];
        L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: '',
            id: 'mapbox.light'
        }).addTo(map);
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        //动态绘制线
        $("#line").click(function () {
            map.off();// 关闭该事件
            DrawLine();

        });
        //动态画多边形
        $("#polygon").click(function () {
            map.off();// 关闭该事件
            DrawPolygon();
        });
        //清除所有命令
        $("#clear").click(function () {
            map.off();
        });
        $("#clearCanvas").click(function () {
            map.eachLayer(function (layer) {
                if(!layer._container){
                    layer.remove();
                }
            });
        });
        //线绘画
        function DrawLine() {
            var points = [];
            var lines = new L.polyline(points);
            var tempLines = new L.polyline([]);
            map.on('click', onClick);    //点击地图
            map.on('dblclick', onDoubleClick);
            function onClick(e) {
                points.push([e.latlng.lat, e.latlng.lng]);
                lines.addLatLng(e.latlng);
                map.addLayer(lines);
                map.addLayer(L.circle(e.latlng, { color: '#afb8ff', fillColor: '#afb8ff', fillOpacity: 1 }))
                map.on('mousemove', onMove)//双击地图

            }
            function onMove(e) {
                if (points.length > 0) {
                    ls = [points[points.length - 1], [e.latlng.lat, e.latlng.lng]];
                    tempLines.setLatLngs(ls);
                    map.addLayer(tempLines)
                }
            }

            function onDoubleClick() {
                L.polyline(points,{ color: '#afb8ff', fillColor: '#afb8ff', fillOpacity: 1 }).addTo(map);
                points.map((el)=>{
                    line.features[0].geometry.coordinates.push([el[1],el[0]]);
                });
                map.off();
                points = [];
                lines = new L.polyline(points);
            }
        }
        //多边形绘画
        function DrawPolygon() {
            var points = [];
            var lines = new L.polyline([]);
            var tempLines = new L.polygon([]);
            map.on('click', onClick);    //点击地图
            map.on('dblclick', onDoubleClick);
            map.on('mousemove', onMove);//双击地图
            function onClick(e) {
                points.push([e.latlng.lat, e.latlng.lng]);
                lines.addLatLng(e.latlng);
                map.addLayer(lines);
                map.addLayer(L.circle(e.latlng, { color: '#5afb8b', fillColor: '#5afb8b', fillOpacity: 1 }))
            }
            function onMove(e) {
                if (points.length > 0) {
                    ls = [points[points.length - 1], [e.latlng.lat, e.latlng.lng]];
                    tempLines.setLatLngs(ls);
                    map.addLayer(tempLines);
                }
            }
            function onDoubleClick(e) {
                L.polygon([points],{ color: '#5afb8b', fillColor: '#5afb8b', fillOpacity: 0.3 }).addTo(map);
                points.map((el)=>{
                    polygon.features[0].geometry.coordinates[0].push([el[1],el[0]]);
                });
                map.off();
                points = [];
                lines = new L.polyline([]);
            }
        }
    };
    //点绘图
    DrawPoint=(code,name,index)=>{
        var points=[];
        map.on('click', function (e) {
            points.push([e.latlng.lng,e.latlng.lat]);
            L.marker(e.latlng,{
                icon:L.icon({
                    iconUrl: noStatus,
                    iconSize: [30, 30],
                    iconAnchor: [16, 37],
                    popupAnchor: [0, -28]
                })}).addTo(map);
            document.getElementsByClassName('cameraName')[index].setAttribute("disabled","true");
            points.map((el)=>{
                coordinate.features.push({
                    "type": "Feature",
                    "properties": {
                        "popupContent":name,
                        "id":2,
                        "code":code
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates":el
                    }
                })
            });
            map.off();
        });
    };
    hanleCamera=()=>{
        axios.ajax({
            method:"get",
            url:window.g.loginURL+"/api/camera/getlist",
            data:{}
        }).then((res)=>{
            this.setState({
                cameraList:res.data
            })
        })
    };
    handleEquipment=(code,index,name)=>{
        this.DrawPoint(code,name,index);
    };
    hanleSubmit=()=>{
        if( coordinate.features.length>0 || line.features[0].geometry.coordinates.length>0 || polygon.features[0].geometry.coordinates[0].length>0){
            axios.ajax({
                method:"get",
                url:window.g.loginURL+"/api/system/elemap",
                data:{
                    point:coordinate,
                    line:line,
                    polygon:polygon
                }
            }).then((res)=>{
                line.features[0].geometry.coordinates=[];
                polygon.features[0].geometry.coordinates[0]=[];
                coordinate.features=[];
                message.success(res.msg);
            })
        }else{
            message.warning("至少绘制一种图形");
        }
    };
    render() {
        return (
            <div className="electronicMap">
                <div className="container" id="container"></div>
                <div className='info'>操作说明：线和多边形通过点击绘制，双击结束绘制；点击设备按钮后在地图上摆放设备位置；<br/>
                    线和多边形一次只能绘制一个;点击确定进行数据提交，首页展示数据。</div>
                <div className="input-card">
                    <div className="equipmentCon">
                        {
                            this.state.cameraList.map((el,i)=>(
                               <div key={i} className="equipment"><Button type="primary"  ghost className="cameraName" onClick={()=>this.handleEquipment(el.code,i,el.name)}>{el.name}</Button></div>
                            ))
                        }
                    </div>
                    <div className="input-item">
                        {/*<input type="button" className="input-text" id="point" value="点 " />*/}
                        <input type="button" className="input-text" id="line" value="线" />
                        <input type="button" className="input-text" id="polygon" value="多边形"/>
                    </div>
                    <div className="input-item">
                        <input type="button" className="btn" id="clear" value="清除所有命令" />
                        <input type="button" className="btn" id="clearCanvas" value="清除画布" />
                        <input type="button" className="btn"  value="确定" onClick={this.hanleSubmit} />
                    </div>
                </div>
            </div>
        )
    }
}
export default ElectronicMap;