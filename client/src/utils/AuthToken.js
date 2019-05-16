import axios from "axios";

const AuthToken = token => {
  //checks for token in local storage, if present, set at global header
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    //if there is not a token then delete the default global header, restricting access
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default AuthToken;
