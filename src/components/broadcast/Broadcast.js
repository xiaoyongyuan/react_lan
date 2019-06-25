import React, { Component } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
class Broadcast extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        this.player = videojs('myvideo', {
            preload: 'auto',// 预加载
            bigPlayButton: {},// 大按钮
            controls: true,// 是否开启控制栏
            width: 800,// 播放器宽度
            height: 600,// 播放器高度
            playbackRates: [1, 1.5, 2],
            muted: true, //是否循环播放
            loop : true, //是否静音
            autoplay:true, //是否自动播放
        }, function onPlayerReady() {
                this.src({
                    src: 'rtmp://192.168.1.155/live/teststream0',
                    type:'rtmp/flv'
                })
        });
    }

    render() {
        return(
            <div>
                <div data-vjs-player>
                    <video ref={ node => this.videoNode = node } className="video-js" id="myvideo"></video>
                </div>
            </div>
        );
    }
}

export default Broadcast;
