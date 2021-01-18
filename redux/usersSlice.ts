import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    isLoggedIn: false,
    token: null,
    user: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const {logIn, logOut} = userSlice.actions;
export default userSlice.reducer;
