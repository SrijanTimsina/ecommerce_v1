import { createStore, applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import alert from "./reducers/alert";
import ad from "./reducers/ad";
import { apiSlice } from "./slices/apiSlices";
import cartSliceReducer from "./slices/cartSlice";
import authSliceReducer from "./slices/authSlice";
import setAuthToken from "./utils/setAuthToken";

const initialState = {};
console.log(apiSlice.middleware);
const middleware = [thunk, apiSlice.middleware];
const rootReducer = combineReducers({
	auth,
	alert,
	ad,
	apiSlice,
	cartSliceReducer,
	authSliceReducer,
});

const localStorageMiddleware = () => {
	if (localStorage.token) setAuthToken(localStorage.token);
};

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		cart: cartSliceReducer,
		auth: auth,
		alert: alert,
		ad: ad,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),

	devTools: true,
});

export default store;
