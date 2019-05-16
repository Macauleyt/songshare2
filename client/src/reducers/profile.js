import { GetProfile, ProfileError, Clear } from "../actions/constants";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GetProfile:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case ProfileError:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case Clear:
      return {
        ...state,
        profile: null,
        token: null,
        loading: false
      };

    default:
      return state;
  }
}
