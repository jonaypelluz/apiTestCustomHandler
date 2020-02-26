import { AuthConstants } from "../Constants";

let user = JSON.parse(sessionStorage.getItem("user"));
const initialState = user ? { isLoading: false, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case AuthConstants.TOKEN_REQUEST:
    case AuthConstants.LOGIN_REQUEST:
    case AuthConstants.REGISTER_REQUEST:
      return { isLoading: true };
    case AuthConstants.TOKEN_FAILURE:
    case AuthConstants.LOGIN_FAILURE:
      return { isLoading: false, error: action.error };
    case AuthConstants.LOGIN_SUCCESS:
    case AuthConstants.REGISTER_SUCCESS:
      return { isLoading: false, user: action.user };
    case AuthConstants.TOKEN_SUCCESS:
      return { isLoading: false, refresh: true };
    case AuthConstants.LOGOUT:
    case AuthConstants.REGISTER_FAILURE:
      return { isLoading: false };
    default:
      return state;
  }
}
