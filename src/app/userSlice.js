import {createSlice} from "@reduxjs/toolkit";

const componentName = "userSlice.js";

const initialState = {
    userID: null,
    firstName: null,
    lastName: null,
    email: null,
    updatedBy: null,
    admin: false,
    active: false,
    sessionToken: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserData: {
      reducer(state, action) {
        // console.log(componentName, "loadUserData action.payload", action.payload);
        // console.log(componentName, "loadUserData action.payload.length", action.payload.length);

        if (typeof action.payload === "object") {


            if (action.payload.hasOwnProperty("userID")) {
                state.userID = action.payload.userID;
            };

            if (action.payload.hasOwnProperty("firstName")) {
                state.firstName = action.payload.firstName;
            };

            if (action.payload.hasOwnProperty("lastName")) {
                state.lastName = action.payload.lastName;
            };

            if (action.payload.hasOwnProperty("email")) {
                state.email = action.payload.email;
            };

            if (action.payload.hasOwnProperty("updatedBy")) {
                state.updatedBy = action.payload.updatedBy;
            };

            if (action.payload.hasOwnProperty("admin")) {
                state.admin = action.payload.admin;
            };

            if (action.payload.hasOwnProperty("active")) {
                state.active = action.payload.active;
            };

        };


      }
    },
    setSessionToken: {
      reducer(state, action) {
        // console.log(componentName, "setLinkItem action.payload", action.payload);
        // console.log(componentName, "setLinkItem action.payload.length", action.payload.length);

        state.sessionToken = action.payload;

      }
    }
}
});

export const {loadUserData, setSessionToken} = userSlice.actions;

export default userSlice.reducer;