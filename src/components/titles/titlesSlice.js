import { createSlice } from "@reduxjs/toolkit"

import initialState from "./titlesInitialState";

const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {

  }
})

// export const { } = titlesSlice.actions

export default titlesSlice.reducer