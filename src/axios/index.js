import axios from 'axios';
import { message } from "antd";
export default class Axios {
    static login(options){
        let loading;
       /* if (options.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }*/
        return new Promise((resolve,reject)=>{
            axios.post(window.g.loginURL+'/api/login/verify',options.data)
                .then((response)=>{
                   /* if (options.isShowLoading !== false) {
                        loading = document.getElementById('ajaxLoading');
                        loading.style.display = 'none';
                    }*/
                    if(response&&response.status=='200'){
                        const res=response.data;
                        resolve(res)
                    }else reject(response.msg);

                })


        })
    }
    static logout(options){
        let loading;
        if (options.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios({
                method:'get',
                url: window.g.exiturl+'/login/exit',
                params:{
                    token:localStorage.getItem("token")
                },
                // headers: {
                //     ContentType:'application/json;charset=UTF-8',
                //     AUTHORIZATION: 'Bearer '+localStorage.getItem("token")
                // }
            })
            .then((response)=>{
                if (options.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response&&response.status=='200'){
                    const res=response.data;
                    resolve(res)
                }else reject(response.msg);
            });

        })
    }


    



}
export const post = async (
    { url, msg = "接口异常", data = {}, type },
    callback
) => {
    const token = localStorage.getItem("token");
    const comid = localStorage.getItem("comid");
    const account = localStorage.getItem("account");

    if (
        !account ||
        account === "undefined" ||
        !token ||
        !comid ||
        token === "undefined" ||
        comid === "undefined"
    ) {
        window.location.href = "#/login";
        return callback(false);
    }
    const head = {
        headers: {
            AUTHORIZATION: token
        }
    };

    axios
        .post(
            window.g.loginURL + url,
            Object.assign({ comid: comid, user: account }, data),
            head
        )
        .then(res => {
            if (res.data.success === 1) {
                return callback(res.data);
            } else if (res.data.success === 2) {
                window.location.href = "#/login";
                return callback(false);
            } else {
                if (type) {
                    return callback(false);
                }
                message.warn(res.data.errorinfo);
                return callback(false);
            }
        })
        .catch(err => {
            console.log("err", err);
            message.warn(msg);
        });
};