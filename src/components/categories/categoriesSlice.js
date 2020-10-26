import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  
  {"categoryID":1,"category":"Novels","sortID":1,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"categoryID":2,"category":"Short Story Collections","sortID":2,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"categoryID":3,"category":"Non Fiction","sortID":3,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"categoryID":4,"category":"Secondary Resources","sortID":4,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"categoryID":5,"category":"Secondary Resources - Blade Runner","sortID":5,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"categoryID":6,"category":"Film","sortID":6,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"categoryID":7,"category":"Television","sortID":7,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  // {"categoryID":8,"category":"Documentaries","sortID":8,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"categoryID":9,"category":"Radio","sortID":9,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"categoryID":10,"category":"Music","sortID":10,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"categoryID":11,"category":"Games","sortID":11,"active":true,"createdAt":"2020-10-19T03:10:19.256Z","updatedAt":"2020-10-19T03:10:19.256Z"},
  {"categoryID":12,"category":"Short Stories","sortID":12,"active":true,"createdAt":"2020-10-19T18:24:53.863Z","updatedAt":"2020-10-19T18:24:53.863Z"}

]

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {

  }
})

// export const { } = categoriesSlice.actions

export default categoriesSlice.reducer