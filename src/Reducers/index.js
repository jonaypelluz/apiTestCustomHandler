import { combineReducers } from "redux";
import { alert } from "./AlertReducer";
import { authentication } from "./AuthReducer";
import { me } from "./ProfileReducer";

const rootReducer = combineReducers({
    authentication,
    alert,
    me,
});

export default rootReducer;
