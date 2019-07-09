import React, { Component } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import flash from "../../style/ztt/imgs/flash.png";
var ActiveXObject=window.ActiveXObject;
class Live extends Component {
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
            this.player = videojs('myvideo', {
                preload: 'auto',// 预加载
                bigPlayButton: {},// 大按钮
                controls: true,// 是否开启控制栏
                width: 850,// 播放器宽度
                height: 600,// 播放器高度
                playbackRates: [1, 1.5, 2],
                muted: false, //是否静音
                loop : true, //是否循环播放
                autoplay:false, //是否自动播放
            }, function onPlayerReady() {
                this.src({
                    src: 'rtmp://192.168.1.176/live/1000020',
                    type:'rtmp/flv'
                })
            });
        }else{
            this.player = videojs('myvideo', {
                preload: 'none',// 预加载
                width: 850,// 播放器宽度
                height: 600,// 播放器高度
                playbackRates: [1, 1.5, 2],
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
                 <video ref={ node => this.videoNode = node } className="video-js" id="myvideo" poster={flash}></video>
             </div>
        );
    }
}
export default Live;