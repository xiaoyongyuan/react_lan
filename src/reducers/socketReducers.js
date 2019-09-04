import { combineReducers} from "redux";
import { SOCKET } from "../action/type";
const initialState={
    num:"0"
};
const postReducer=(state=initialState,action)=>{
    switch (action.type) {
        case SOCKET:
            return{
                ...state,
                num:action.payload
            };
        default:
            return state;
    }
};
export default combineReducers({
    postReducer
})