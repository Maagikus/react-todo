import projectReducer from "./projectReduser";
import authReducer from "./authReduser";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer
})
export default rootReducer