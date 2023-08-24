import { AnyAction, Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
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

const appReducer = combineReducers({
    account: accountReducer,
    stepper: stepperReducer,
})

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "account/resetData") {
    storage.removeItem("persist:root");
    window.location.reload(); 

    state = {} as RootState;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof appReducer>;
