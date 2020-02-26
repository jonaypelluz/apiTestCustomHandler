import { AuthConstants } from "../Constants";
import { handleError, history } from "../Helpers";
import { logout, refresh, register } from "../Services/AuthServices";

export const AuthActions = {
    loginAction,
    logoutAction,
    registerAction,
    refreshAction,
};

function loginAction(username, password) {
    return dispatch => {
        /*** Dummy response ***/
        sessionStorage.setItem(
            "user",
            JSON.stringify({
                token_type: "Bearer",
                expires_in: 473354280,
                access_token: "ACCESS_TOKEN",
                refresh_token: "REFRESH_TOKEN",
            }),
        );
        dispatch(
            success({
                token_type: "Bearer",
                expires_in: 473354280,
                access_token: "ACCESS_TOKEN",
                refresh_token: "REFRESH_TOKEN",
            }),
        );
        history.push("/");
        /*** End of dummy response ***/

        // dispatch(request());
        //
        // login(username, password).then(
        //   user => {
        //     dispatch(success(user));
        //     history.push("/");
        //   },
        //   error => {
        //     handleError(dispatch, error);
        //     dispatch(failure(error));
        //   }
        // );
    };

    // function request() {
    //     return { type: AuthConstants.LOGIN_REQUEST };
    // }
    function success(user) {
        return { type: AuthConstants.LOGIN_SUCCESS, user };
    }
    // function failure(error) {
    //     return { type: AuthConstants.LOGIN_FAILURE, error };
    // }
}

function refreshAction() {
    return dispatch => {
        dispatch(request());

        refresh().then(
            user => {
                dispatch(success(user));
            },
            error => {
                dispatch(failure(error));
                dispatch(logoutAction());
                history.push("/");
            },
        );
    };

    function request() {
        return { type: AuthConstants.TOKEN_REQUEST };
    }
    function success(user) {
        return { type: AuthConstants.TOKEN_SUCCESS, user };
    }
    function failure(error) {
        return { type: AuthConstants.TOKEN_FAILURE, error };
    }
}

function logoutAction() {
    logout();
    return { type: AuthConstants.LOGOUT };
}

function registerAction(user) {
    return dispatch => {
        dispatch(request());

        register(user).then(
            user => {
                dispatch(success());
                // TODO: redirect to login
                dispatch("Registration successful");
            },
            error => {
                handleError(dispatch, error);
                dispatch(failure(error));
            },
        );
    };

    function request() {
        return { type: AuthConstants.REGISTER_REQUEST };
    }
    function success(user) {
        return { type: AuthConstants.REGISTER_SUCCESS, user };
    }
    function failure(error) {
        return { type: AuthConstants.REGISTER_FAILURE, error };
    }
}
