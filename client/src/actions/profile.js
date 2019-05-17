import axios from "axios";
import { setAlert } from "./alert";
import { GetProfile, DeleteAccount } from "./constants";
import { ProfileError, Clear } from "./constants";

//Get user profile

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GetProfile,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ProfileError,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Create user profile

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("api/profile", formData, config);

    dispatch({
      type: GetProfile,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
    //Redirect only is user is not editing profile
    if (!edit) {
      history.push("/main");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ProfileError,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete Account

export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("/api/profile");

      dispatch({ type: Clear });
      dispatch({ type: DeleteAccount });

      dispatch(setAlert("Your account has been permanantly deleted"));
    } catch (err) {
      dispatch({
        type: ProfileError,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
