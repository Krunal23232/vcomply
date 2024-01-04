import { AuthUser, AuthUserDetails } from "../interface/interface";
import { STRING } from "./string";


function getLoggedInUserToken() {
  const token = localStorage.getItem(STRING.LOCALSTORAGE_USER_AUTH_TOKEN_KEY);
  return token || null;
}

function loginUser({ uid, email, name }: AuthUser) {
  localStorage.setItem(STRING.LOCALSTORAGE_USER_AUTH_TOKEN_KEY, uid);
  localStorage.setItem(
    STRING.LOCALSTORAGE_USER_AUTH_DETAILS_KEY,
    JSON.stringify({ email, name })
  );
}

function getLoggedInUserDetails(rawJsonString = false) {
  try {
    const userDetails = localStorage.getItem(
      STRING.LOCALSTORAGE_USER_AUTH_DETAILS_KEY
    ) as string;
    if (rawJsonString) {
      return userDetails;
    }
    return JSON.parse(userDetails);
  } catch (error) {
    return null;
  }
}

const LocalstorageService = {
  getLoggedInUserToken,
  loginUser,
  getLoggedInUserDetails
};

export default LocalstorageService;
