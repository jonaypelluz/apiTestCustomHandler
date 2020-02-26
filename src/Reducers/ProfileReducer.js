import { ProfileConstants } from "../Constants";

let profile = JSON.parse(sessionStorage.getItem("profile"));
const initialState = profile ? { isLoading: false, profile } : { isLoading: true, profile: false };

export function me(state = initialState, action) {
    switch (action.type) {
        case ProfileConstants.ME_REQUEST:
            return { isLoading: true, profile: false };
        case ProfileConstants.ME_FAILURE:
            return { isLoading: false, error: action.error };
        case ProfileConstants.ME_SUCCESS:
            return { isLoading: false, profile: action.profile };
        default:
            return state;
    }
}
