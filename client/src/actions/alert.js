import { Set_Alert, Remove_Alert } from "./constants";
import uuid from "uuid";

export const setAlert = (msg, alertType) => dispatch => {
  //applying randomly generated value to id using uuid
  const id = uuid.v4();
  dispatch({
    //Select redux state and pass error message, type and unique id
    type: Set_Alert,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: Remove_Alert, payload: id }), 5000);
};
