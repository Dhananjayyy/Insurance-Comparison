import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loggedReducer from "./loggedslice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, loggedReducer);

const store = configureStore({
  reducer: {
    logged: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
