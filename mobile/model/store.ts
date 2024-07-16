// import {configureStore} from '@reduxjs/toolkit'

// import DataReducer from './data'

// import ThemeReducer from './theme'

// export const store = configureStore({

//     reducer: {

//         UI: ThemeReducer,

//         data: DataReducer

//     }

// })

// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataReducer from './data';
import ThemeReducer from './theme';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['data'], // Only persist the 'data' reducer
};

const rootReducer = combineReducers({
    UI: ThemeReducer,
    data: DataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
