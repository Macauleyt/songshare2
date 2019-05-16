import { Registered } from "../actions/constants";
import { NotRegistered } from "../actions/constants";
import { NotAuth } from "../actions/constants";
import { UserLoad } from "../actions/constants";
import { LoggedIn } from "../actions/constants";
import { NotLoggedIn } from "../actions/constants";
import { LogOut } from "../actions/constants";

//Object with token data and authentication boolean
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  //If successeful, then login
  switch (type) {
    case UserLoad:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload //user data - the password from backend
      };
    //Successful registration or login performs the same action, storing token in local storage and set auth to true
    case Registered:
    case LoggedIn:
      localStorage.setItem("token", payload.token);
      return {
        //Update state, token is taken from successful registration, loading switched to false to stop loading data
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    //User is not authenticated, no token, prevent more loading, used for both register and login authorisation, also logout clears token
    case NotRegistered:
    case NotAuth:
    case NotLoggedIn:
    case LogOut:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
