import React, { Component } from 'react';
import "../../style/ztt/css/electronicMap.less";
import {Map,Marker} from 'react-amap';
class ElectronicMap extends Component{
    constructor(props) {
        super(props);
        this.state = {
            mapZoom: 12, //地图缩放等级 （zoom）
            status: {
                zoomEnable: true,
                dragEnable: true,
            },
            mapCenter:[108.946465,34.381835],//地图中心点
            mapMake :[116.273961, 39.946338],//marker标记点
        };
    }
    componentDidMount() {
        this.setState({

        })
    }

    render() {
        let {mapCenter, mapMake, mapZoom, mapKey, status} = this.state;
        return (
            <Map amapkey={mapKey} center={mapCenter} zoom={mapZoom} status={status}>
                {/*marker标记点创建必有参数 （position中心点）*/}
                <Marker position={mapMake}/>
            </Map>
        );
    }
}
export default ElectronicMap;