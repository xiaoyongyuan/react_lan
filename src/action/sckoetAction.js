import { SOCKET } from "./type";
export const postReducer=num=>dispatch=>{
    dispatch({
        type:SOCKET,
        payload:num
    })
}