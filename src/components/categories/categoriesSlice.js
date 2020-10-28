import { createSlice } from "@reduxjs/toolkit"

import initialState from "./categoriesInitialState";

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {

  }
})

// export const { } = categoriesSlice.actions

export default categoriesSlice.reducer