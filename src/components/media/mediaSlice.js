import {createSlice} from "@reduxjs/toolkit";

import initialState from "./mediaInitialState";

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {

  }
})

// export const { } = mediaSlice.actions

export default mediaSlice.reducer