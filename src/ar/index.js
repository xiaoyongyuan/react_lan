import { createStore } from "redux";
const CHANGERST = "CHANGERST";

export const changeRst = res => {
  return {
    type: CHANGERST,
    res
  };
};

export const changeRstReducer = (state = { rst: {} }, action) => {
  switch (action.type) {
    case "CHANGERST":
      console.log("CHANGERST", action.res);
      return { ...state, res: { a: action.res } };
    default:
      return state;
  }
};

export const store = createStore(changeRstReducer);

//store.dispatch(changeRst(''));
//store.subscribe(function(){});
//store.getState();
