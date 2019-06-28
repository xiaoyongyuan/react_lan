import axios from 'axios';
import { message } from "antd";
const baseURL = window.g.baseURL;
export default class Axios {
    static login(options){
        let loading;
        if (options.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios.post(window.g.loginURL+'/api/login/verify',options.data)
                .then((response)=>{
                    if (options.isShowLoading !== false) {
                        loading = document.getElementById('ajaxLoading');
                        loading.style.display = 'none';
                    }
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
    static ajax(options){
       /* let loading;
        if (options.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }*/
        const token=localStorage.getItem("token");
        return new Promise((resolve,reject)=>{
            if(!token){
                window.location.href='#/login'
                reject(false)
            }
            axios({
                baseURL: options.baseURL||baseURL,
                method: options.method || 'get',
                url: options.url,
                headers:{
                    ContentType:'application/json;charset=UTF-8',
                    AUTHORIZATION: 'Bearer '+localStorage.getItem("token")
                },
                params: options.method === 'get' || options.method === 'delete' ? options.data : null,
                data: options.method === 'post' || options.method === 'put' ? options.data: null,
            })
                .then((response)=>{
                  /*  if (options.isShowLoading !== false) {
                        loading = document.getElementById('ajaxLoading');
                        loading.style.display = 'none';
                    }*/
                    if(response&&response.status===200){
                        const res=response.data;
                        if(res.success===0){resolve(res)}
                        if(res.success===1){
                            resolve(res)
                        }else if(res.success==='401' || res.success==='402'){
                            reject(response.msg);
                            message.error(res.msg);
                            window.location.href='#/login'
                        }else message.error(res.msg)
                    }else reject(response.msg);
                });

        })
    }
}