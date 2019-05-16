import axios from "axios";
import { setAlert } from "./alert";
import { GetProfile } from "./constants";
import { ProfileError } from "./constants";

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
