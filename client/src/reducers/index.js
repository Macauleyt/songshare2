//Combine Reducers
import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";

import profile from "./profile";

//Listing redux states for uses with redux development tools, google chrome extension
import alert from "./alert";
export default combineReducers({
  alert,
  auth,
  post,
  profile
});
