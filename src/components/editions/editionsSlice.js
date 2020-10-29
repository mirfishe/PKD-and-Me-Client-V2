import { createSlice } from "@reduxjs/toolkit"

import initialState from "./editionsInitialState";

const editionsSlice = createSlice({
  name: "editions",
  initialState,
  reducers: {

  }
})

// export const { } = editionsSlice.actions

export default editionsSlice.reducer