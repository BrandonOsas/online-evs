import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/account";
import stepperReducer from "./features/stepper";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["stepper"]
}

const rootReducer = combineReducers({
    account: accountReducer,
    stepper: stepperReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
