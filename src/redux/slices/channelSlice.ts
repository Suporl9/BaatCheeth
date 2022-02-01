import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channelId: null,
  channelName: null,
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    // ?  remove the object braces and make it function with state.
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
    // setChannelInstant: (state, action) => {
    //   state.channelId = action.payload.channelId;
    //   state.channelName = action.payload.channelName;
    // },
  },
});

//actions generated
export const { setChannelInfo } = channelSlice.actions;

//export to get the slice in any selector (inuseselector)

export const getChannelId = (state) => state.channel.channelId; // ? check if this  works
export const getChannelName = (state) => state.channel.channelName;

//export the reducer

const channelReducer = channelSlice.reducer;
export default channelReducer;
