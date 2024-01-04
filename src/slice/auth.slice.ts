import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthInterface } from "../interface/interface";

const initialState: AuthInterface = {
  isRegisterLoading: false,
  registerUserDetails: null,
  registerUsererror: null,

  isLoginLoading: false,
  loginUserDetails: null,
  loginUserError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // register start
    registerRequest(state) {
      state.isRegisterLoading = true;
      state.registerUsererror = null;
    },
    registerSuccess(state, action: PayloadAction<any>) {
      state.isRegisterLoading = false;
      state.registerUserDetails = action.payload;
      state.registerUsererror = null;
    },
    registerError(state, action: PayloadAction<string>) {
      state.isRegisterLoading = false;
      state.registerUserDetails = null;
      state.registerUsererror = action.payload;
    },
    // register end

    // login start
    loginRequest(state) {
      state.isLoginLoading = true;
      state.loginUserError = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.isLoginLoading = false;
      state.loginUserDetails = action.payload;
      state.loginUserError = null;
    },
    loginError(state, action: PayloadAction<string>) {
      state.isLoginLoading = false;
      state.loginUserDetails = null;
      state.loginUserError = action.payload;
    },
  },
});

export const { registerRequest, registerSuccess, registerError,loginRequest,loginError,loginSuccess } =
  authSlice.actions;

export default authSlice.reducer;
