import React, { Component } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import flash from "../../style/ztt/imgs/flash.png";
import "./live.less";
var ActiveXObject=window.ActiveXObject;
class Live extends Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.liveModel){
            this.setState({
                liveModel:nextProps.liveModel,
            },()=>{
                this.componentDidMount();
            });
        }
    }
    componentDidMount() {
        //判断浏览器是否有flash插件
        var isIE=false;
        if(window.ActiveXObject){
            isIE=true;
        }
        var has_flash=false;
        try{
            if(isIE){
                var flash=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                has_flash=true;
            }else{
                var flash=navigator.plugins["Shockwave Flash"];
                if(flash){
                    has_flash=true;
                }
            }
        }catch (e) {
            console.log(e);
        }
        if(has_flash){
            var _this=this;
           videojs.options.flash.swf = require('videojs-swf/dist/video-js.swf');
           // videojs.options.flash.swf = require("../../style/video-js.swf");
            this.player = videojs(this.videoNode, {
                preload: 'auto',// 预加载
                bigPlayButton: {},// 大按钮
                controls: true,// 是否开启控制栏
                width: 850,// 播放器宽度
                height: 600,// 播放器高度
                playbackRates: [1, 1.5, 2],
                muted: true, //是否静音
                loop : false, //是否循环播放
                autoplay:true, //是否自动播放
                techOrder: ["flash"],//设置flash播放
                language: "zh-CN",
            }, function onPlayerReady() {
                if(_this.props.videostreaming){
                    this.src({
                        src: _this.props.videostreaming,
                        type:'rtmp/flv'
                    })
                }
            });
        }else{
            this.player = videojs(this.videoNode, {
                preload: 'none',// 预加载
                width: 850,// 播放器宽度
                height: 600,// 播放器高度
                playbackRates: [1, 1.5, 2],
                techOrder: ["flash"],//设置flash播放
                language: "zh-CN",
            });
        }
    }
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }
    render() {
        return(
            <div data-vjs-player>
                <video ref={ node => this.videoNode = node } className="video-js vjs-big-play-centered" id="myvideo" poster={flash}></video>
            </div>
        );
    }
}
export default Live;