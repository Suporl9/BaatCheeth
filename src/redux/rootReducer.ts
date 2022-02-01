import { combineReducers } from "@reduxjs/toolkit";
import channelReducer from "./slices/channelSlice";

const rootReducer = combineReducers({
  channel: channelReducer,
  //add more reducers here if needed
});
export default rootReducer;
