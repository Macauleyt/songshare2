import { Registered } from "./constants";
import { NotRegistered } from "./constants";
import { UserLoad } from "./constants";
import { NotAuth } from "./constants";
import { setAlert } from "./alert";
import { Clear } from "./constants";

import axios from "axios";
import AuthToken from "../utils/AuthToken";
import { LoggedIn } from "./constants";
import { NotLoggedIn } from "./constants";
import { LogOut } from "./constants";

//User Load

export const loadUser = () => async dispatch => {
  //check for token, using AuthToken function
  if (localStorage.token) {
    AuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("api/auth");

    dispatch({
      type: UserLoad,
      payload: res.data //user data
    });
  } catch (err) {
    dispatch({
      type: NotAuth
    });
  }
};

//Register a user

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: Registered,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: NotRegistered
    });
  }
};

//Login a user

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LoggedIn,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: NotLoggedIn
    });
  }
};

//Log Out

export const logout = () => dispatch => {
  dispatch({ type: Clear });
  dispatch({ type: LogOut });
};
