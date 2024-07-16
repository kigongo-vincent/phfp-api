import { configureStore } from "@reduxjs/toolkit";
import DataReducer from './data'

export const store = configureStore({
    reducer:{
        data: DataReducer
    }
})