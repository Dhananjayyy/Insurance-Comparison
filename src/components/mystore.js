import {configureStore} from "@reduxjs/toolkit";
import loggedReducer from "./loggedslice";
export default configureStore({
    reducer: {
        logged: loggedReducer
    }
})