import { AlertConstants } from "../Constants";
import { AuthActions } from "./";

export const AlertActions = {
  success,
  error,
  clear
};

function success(message) {
  return { type: AlertConstants.SUCCESS, message };
}

function error(message) {
  if (message === "Unauthorized" && sessionStorage.getItem("user")) {
    return AuthActions.refreshAction();
  } else {
    return { type: AlertConstants.ERROR, message };
  }
}

function clear() {
  return { type: AlertConstants.CLEAR };
}
