import { configureStore } from "@reduxjs/toolkit";
import { authReducer, messageReducer } from "./reducer";
import logger from 'redux-logger'
import thunk from "redux-thunk";



const store = configureStore({
  reducer: {
    auth: authReducer,
    messagess: messageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
},

);

export default store;