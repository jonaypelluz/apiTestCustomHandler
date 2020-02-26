import { ProfileConstants } from "../Constants";
import { handleError, history } from "../Helpers";
import { me } from "../Services/ProfileServices";

export const ProfileActions = {
    meAction,
};

function meAction() {
    return dispatch => {
        dispatch(request());

        sessionStorage.setItem(
            "profile",
            JSON.stringify({
                name: "Rick",
                email: "rick@email",
            }),
        );

        dispatch(success(JSON.stringify({
            name: "Rick",
            email: "rick@email",
        })));

        // me().then(
        //     profile => {
        //         dispatch(success(profile));
        //     },
        //     error => {
        //         handleError(dispatch, error);
        //         dispatch(failure(error));
        //         history.push("/");
        //     },
        // );
    };

    function request() {
        return { type: ProfileConstants.ME_REQUEST };
    }
    function success(profile) {
        return { type: ProfileConstants.ME_SUCCESS, profile };
    }
    // function failure(error) {
    //     return { type: ProfileConstants.ME_FAILURE, error };
    // }
}
