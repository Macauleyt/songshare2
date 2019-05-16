import { Set_Alert, Remove_Alert } from "../actions/constants";
//Setting up empty fields
const initialState = [];

//action = type or data
export default function(state = initialState, action) {
  switch (action.type) {
    case Set_Alert:
      //check for current state, if it exists copy it and add new alert to array
      return [...state, action.payload];
    case Remove_Alert:
      //check if alert id is not equal to the payload id
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
}
