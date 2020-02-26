import { AlertActions } from "../Actions";

export function handleError(dispatch, error) {
  if (typeof error === "string" || error instanceof String) {
    dispatch(AlertActions.error(error));
  } else if (error.response && typeof error.response.status !== undefined && error.response.status === 401) {
    dispatch(AlertActions.error("Unauthorized"));
  } else if (error.message) {
    dispatch(AlertActions.error(error.message));
  } else if (typeof error === "object") {
    dispatch(AlertActions.error(error[0]));
  } else {
    dispatch(AlertActions.error(error));
  }
}
