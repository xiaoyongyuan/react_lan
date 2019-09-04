import { SOCKET } from "./type";
export const postReducer=()=>dispatch=>{
    if ("WebSocket" in window) {
        // 打开一个 web socket
        var ws = new WebSocket("ws://192.168.1.176:8111/api/websocket/1");
        ws.onopen = function () {
            ws.send("0");
        };
        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            if(received_msg!=="连接成功"){
                dispatch({
                    type:SOCKET,
                    payload:received_msg
                });
            }
            console.log("数据已接收...");
        };
        ws.onclose = function () {
            // 关闭 websocket
            console.log("连接已关闭...");
        };
    }
}
