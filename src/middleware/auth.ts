import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { Dispatch } from "redux";
import { RegisterInterface, AuthUser } from "../interface/interface";
import {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginError,
  loginSuccess,
} from "../slice/auth.slice";
import LocalstorageService from "../config/localstorage-services";
import { auth } from "../firebase";

export const registerUser =
  (userData: RegisterInterface) => async (dispatch: Dispatch) => {
    const { email, password, username } = userData;
    dispatch(registerRequest());
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: username || "" });
        const newUser: AuthUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email || "",
          name: auth.currentUser.displayName || "",
        };
        dispatch(registerSuccess(newUser));
      }
    } catch (error: any) {
      dispatch(registerError(error.message));
    }
  };

export const loginUser =
  (userData: RegisterInterface) => async (dispatch: Dispatch) => {
    const { email, password } = userData;
    dispatch(loginRequest());
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const loggedInUser: AuthUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email || "",
        name:userCredential.user.displayName 
      };
      LocalstorageService.loginUser(loggedInUser);

      dispatch(loginSuccess(loggedInUser));
    } catch (error: any) {
      dispatch(loginError(error.message));
    }
  };
