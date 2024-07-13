import { configureStore, combineReducers } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice" // save the user's navigation and can pull that information in anywhere in our app


export const store = configureStore ({
    reducer: {
        nav: navReducer,
    },
});