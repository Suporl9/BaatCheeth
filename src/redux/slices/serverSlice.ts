import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serverId: null,
  serverName: null,
};

const ServerSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    setServerInfo: (state, action) => ({
      serverId: action.payload.serverName,
      serverName: action.payload.serverId,
    }),
  },
});
export default ServerSlice;
